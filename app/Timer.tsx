import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Dimensions, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams, router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Timer() {
  const params = useLocalSearchParams();
  const exerciseTime = Number(params.exerciseTime) || 30;
  const restTime = Number(params.restTime) || 15;
  const rounds = Number(params.rounds) || 3;

  const [currentRound, setCurrentRound] = useState(1);
  const [isExercisePhase, setIsExercisePhase] = useState(true);
  const [timeLeft, setTimeLeft] = useState(exerciseTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      if (isExercisePhase) {
        if (currentRound === rounds) {
          setIsActive(false);
          setShowModal(true);
        } else {
          setIsExercisePhase(false);
          setTimeLeft(restTime);
          progressAnim.setValue(0);
        }
      } else {
        setCurrentRound(prev => prev + 1);
        setIsExercisePhase(true);
        setTimeLeft(exerciseTime);
        progressAnim.setValue(0);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft, isExercisePhase, currentRound, exerciseTime, restTime, rounds]);

  useEffect(() => {
    if (isActive && !isPaused) {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: isExercisePhase ? exerciseTime * 1000 : restTime * 1000,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(0);
    }
  }, [isActive, isPaused, isExercisePhase, exerciseTime, restTime, currentRound]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
      progressAnim.setValue(0);
    } else {
      setIsActive(false);
      setCurrentRound(1);
      setIsExercisePhase(true);
      setTimeLeft(exerciseTime);
      progressAnim.setValue(0);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      progressAnim.stopAnimation();
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/TimerSettings');
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Timer</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.phaseIndicator}>
          <Text style={[styles.phaseText, isExercisePhase ? styles.exerciseText : styles.restText]}>
            {isExercisePhase ? 'Exercice' : 'Repos'}
          </Text>
          <Text style={styles.roundText}>
            Round {currentRound}/{rounds}
          </Text>
        </View>

        <Animated.View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          <View style={styles.progressContainer}>
            <Animated.View 
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                  backgroundColor: isExercisePhase ? '#4CAF50' : '#FFA000',
                  height: 8,
                  borderRadius: 4,
                }
              ]} 
            />
          </View>
        </Animated.View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={[styles.button, isActive ? styles.stopButton : styles.startButton]} 
            onPress={handleStartStop}
          >
            <Ionicons 
              name={isActive ? "stop-outline" : "play-outline"} 
              size={30} 
              color="white" 
            />
            <Text style={styles.buttonText}>
              {isActive ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>

          {isActive && currentRound < rounds && (
            <TouchableOpacity 
              style={[styles.button, styles.pauseButton]} 
              onPress={handlePause}
            >
              <Ionicons 
                name={isPaused ? "play-outline" : "pause-outline"} 
                size={30} 
                color="white" 
              />
              <Text style={styles.buttonText}>
                {isPaused ? 'Resume' : 'Pause'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="trophy" size={64} color="#FFD700" />
            <Text style={styles.modalTitle}>Bravo !</Text>
            <Text style={styles.modalText}>
              Vous avez terminé votre entraînement avec succès !
            </Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Retour aux paramètres</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  phaseIndicator: {
    alignItems: 'center',
    marginTop: 40,
  },
  phaseText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseText: {
    color: '#4CAF50',
  },
  restText: {
    color: '#FFA000',
  },
  roundText: {
    fontSize: 18,
    color: '#666',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
  },
  progressContainer: {
    width: width - 60,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginTop: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    gap: 10,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  pauseButton: {
    backgroundColor: '#FFA000',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
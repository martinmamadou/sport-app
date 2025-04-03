import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsActive(false);
      setTime(0);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer</Text>
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.timerCard}>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
        </View>
      </View>

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

        {isActive && (
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timerCard: {
    backgroundColor: '#f8f9fa',
    padding: 40,
    borderRadius: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
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
});
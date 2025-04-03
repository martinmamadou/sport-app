import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

export default function TimerSettings() {
  const [exerciseTime, setExerciseTime] = useState(30);
  const [restTime, setRestTime] = useState(15);
  const [rounds, setRounds] = useState(3);

  const totalDuration = (exerciseTime + restTime) * rounds - restTime; // On soustrait le temps de repos du dernier round

  const adjustTime = (type: 'exercise' | 'rest' | 'rounds', increment: boolean) => {
    if (type === 'exercise') {
      setExerciseTime(prev => increment ? prev + 5 : Math.max(5, prev - 5));
    } else if (type === 'rest') {
      setRestTime(prev => increment ? prev + 5 : Math.max(5, prev - 5));
    } else {
      setRounds(prev => increment ? prev + 1 : Math.max(1, prev - 1));
    }
  };

  const startTimer = () => {
    router.push({
      pathname: '/Timer',
      params: {
        exerciseTime,
        restTime,
        rounds,
        totalDuration
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Paramètres du Timer</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temps d'exercice</Text>
          <View style={styles.timeSelector}>
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={() => adjustTime('exercise', false)}
            >
              <Ionicons name="remove" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.timeText}>{exerciseTime} secondes</Text>
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={() => adjustTime('exercise', true)}
            >
              <Ionicons name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temps de repos</Text>
          <View style={styles.timeSelector}>
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={() => adjustTime('rest', false)}
            >
              <Ionicons name="remove" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.timeText}>{restTime} secondes</Text>
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={() => adjustTime('rest', true)}
            >
              <Ionicons name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nombre de rounds</Text>
          <View style={styles.timeSelector}>
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={() => adjustTime('rounds', false)}
            >
              <Ionicons name="remove" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.timeText}>{rounds}</Text>
            <TouchableOpacity 
              style={styles.timeButton} 
              onPress={() => adjustTime('rounds', true)}
            >
              <Ionicons name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Résumé de la séance</Text>
          <Text style={styles.summaryText}>
            Durée totale : {Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}
          </Text>
          <Text style={styles.summaryText}>
            {rounds} rounds de {exerciseTime}s d'exercice
          </Text>
          <Text style={styles.summaryText}>
            {rounds - 1} pauses de {restTime}s
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.startButton} onPress={startTimer}>
        <Text style={styles.startButtonText}>Démarrer la séance</Text>
      </TouchableOpacity>
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
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  summary: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    margin: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

function Div({children, style}:{children:any, style: any}){
  return(
    <View style={style}>
      {children}
    </View>
  )
}

export default function Home(){
  const navigation = () => {
    router.push('/TimerSettings')
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Sporting2</Text>
        <Text style={styles.subtitle}>Votre coach personnel</Text>
      </View>

      <Div style={styles.logoContainer}>
        <Image source={require('../assets/images/icon.png')} style={styles.Logo}/>
        <Text style={styles.welcomeText}>Bienvenue sur sporting2 votre application de sport favorite!</Text>
      </Div>

      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <Ionicons name="fitness-outline" size={24} color="#007AFF" />
          <Text style={styles.featureText}>Exercices personnalisés</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="time-outline" size={24} color="#007AFF" />
          <Text style={styles.featureText}>Suivi de progression</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#007AFF" />
          <Text style={styles.featureText}>Statistiques détaillées</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={navigation}>
        <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Commencer l'entraînement</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  h1:{
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  Logo:{
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  welcomeText: {
    fontSize: 16,
    color: '#4a4a4a',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 20,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
    width: '30%',
  },
  featureText: {
    marginTop: 8,
    fontSize: 12,
    color: '#4a4a4a',
    textAlign: 'center',
  },
  button:{
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
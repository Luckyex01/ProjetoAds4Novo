import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import type { FC } from 'react';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

const services = [
  {
    icon: 'search',
    title: 'Tratamentos Faciais Avançados',
    description: 'Limpeza de pele, peelings químicos, laser facial e mais.',
    requiresBooking: true,
  },
  {
    icon: 'heart',
    title: 'Tratamentos Corporais',
    description: 'Massagens, criolipólise, radiofrequência corporal e mais.',
    requiresBooking: true,
  },
  {
    icon: 'cut',
    title: 'Tratamentos Capilares',
    description: 'Mesoterapia, terapia LED, PRP capilar e hidratação.',
    requiresBooking: true,
  },
  {
    icon: 'stethoscope',
    title: 'Podologia',
    description: 'Tratamento de calos, unhas encravadas, reflexologia podal.',
    requiresBooking: true,
  },
  {
    icon: 'leaf',
    title: 'Bem-Estar e Terapias Alternativas',
    description: 'Aromaterapia, acupuntura, reflexologia e reiki.',
    requiresBooking: true,
  },
  {
    icon: 'stethoscope',
    title: 'Consulta Médica Online',
    description: 'Atendimento com médicos via telemedicina para diversas especialidades.',
    requiresBooking: true,
  },
  {
    icon: 'flask',
    title: 'Exames Laboratoriais',
    description: 'Coleta de sangue, testes clínicos e diagnóstico laboratorial.',
    requiresBooking: true,
  },
  {
    icon: 'heartbeat',
    title: 'Personal Trainer',
    description: 'Acompanhamento personalizado para treinos e dietas.',
    requiresBooking: true,
  },
  {
    icon: 'child',
    title: 'Babá e Cuidador',
    description: 'Profissionais treinados para cuidar de crianças e idosos.',
    requiresBooking: true,
  },
  {
    icon: 'car',
    title: 'Serviços Automotivos',
    description: 'Troca de óleo, revisão geral e lavagem especializada.',
    requiresBooking: true,
  },
  {
    icon: 'wrench',
    title: 'Reparos Residenciais',
    description: 'Serviços de encanamento, elétrica e pequenos reparos.',
    requiresBooking: true,
  },
];

const ServicesScreen: FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Nossos Serviços</Text>
      </View>

      <View style={styles.serviceContainer}>
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            requiresBooking={service.requiresBooking}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const ServiceItem: FC<{
  icon: string;
  title: string;
  description: string;
  requiresBooking: boolean;
}> = ({ icon, title, description, requiresBooking }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.serviceItem}>
      <AnimatedIcon
        name={icon as any}
        size={40}
        color="#00CC6A"
        style={[styles.icon, { transform: [{ scale: scaleAnim }] }]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      />
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
      {requiresBooking && (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agendar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00CC6A',
  },
  serviceContainer: {
    marginTop: 20,
  },
  serviceItem: {
    backgroundColor: '#4B0082',
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#51B2D4',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00CC6A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ServicesScreen;
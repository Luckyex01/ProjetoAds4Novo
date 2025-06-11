import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

type Service = {
  icon: string;
  title: string;
  description: string;
  requiresBooking: boolean;
  actionLabel?: string;
};

const services: Service[] = [
  {
    icon: 'search',
    title: 'Tratamentos Faciais Avançados',
    description: 'Limpeza de pele, peelings químicos, laser facial e mais.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'heart',
    title: 'Tratamentos Corporais',
    description: 'Massagens, criolipólise, radiofrequência corporal e mais.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'cut',
    title: 'Tratamentos Capilares',
    description: 'Mesoterapia, terapia LED, PRP capilar e hidratação.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'stethoscope',
    title: 'Podologia',
    description: 'Tratamento de calos, unhas encravadas e reflexologia podal.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'leaf',
    title: 'Bem-Estar e Terapias Alternativas',
    description: 'Aromaterapia, acupuntura, reflexologia e reiki.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'stethoscope',
    title: 'Consulta Médica Online',
    description:
      'Atendimento com médicos via telemedicina para diversas especialidades.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'flask',
    title: 'Exames Laboratoriais',
    description: 'Coleta de sangue, testes clínicos e diagnóstico laboratorial.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'heartbeat',
    title: 'Personal Trainer',
    description: 'Acompanhamento personalizado para treinos e dietas.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'child',
    title: 'Babá e Cuidador',
    description: 'Profissionais treinados para cuidar de crianças e idosos.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'car',
    title: 'Serviços Automotivos',
    description: 'Troca de óleo, revisão geral e lavagem especializada.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'wrench',
    title: 'Reparos Residenciais',
    description:
      'Serviços de encanamento, elétrica e pequenos reparos.',
    requiresBooking: true,
    actionLabel: 'Agendar',
  },
  {
    icon: 'user',
    title: 'Gestão de Usuários e Cadastro',
    description:
      'Administre cadastros, rastreie perfis e personalize a experiência do cliente.',
    requiresBooking: false,
    actionLabel: 'Ver Detalhes',
  },
  {
    icon: 'shopping-cart',
    title: 'Marketplace e Vendas Online',
    description:
      'Integração com sistemas de e-commerce para produtos digitais e físicos.',
    requiresBooking: false,
    actionLabel: 'Confira',
  },
  {
    icon: 'line-chart',
    title: 'Relatórios e Análises',
    description:
      'Acompanhe métricas, relatórios e KPIs para tomada de decisões estratégicas.',
    requiresBooking: false,
    actionLabel: 'Ver Relatórios',
  },
  {
    icon: 'cogs',
    title: 'Configuração e Manutenção',
    description:
      'Serviços recorrentes para manter seu sistema atualizado e seguro.',
    requiresBooking: true,
    actionLabel: 'Contratar',
  },
];

const ServicesScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com título e tagline */}
      <View style={styles.heading}>
        <Text style={styles.title}>Nossos Serviços</Text>
        <Text style={styles.subtitle}>
          Uma solução multifuncional para todas as necessidades empresariais.
        </Text>
      </View>
      <View style={styles.serviceContainer}>
        {services.map((service, index) => (
          <Animatable.View
            animation="fadeInUp"
            delay={index * 100}
            key={index}
          >
            <ServiceItem {...service} />
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
};

interface ServiceItemProps extends Service {}

const ServiceItem: React.FC<ServiceItemProps> = ({
  icon,
  title,
  description,
  requiresBooking,
  actionLabel,
}) => {
  const navigation = useNavigation<any>();
  const scaleAnim = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const onPressIn = () => {
    scaleAnim.value = withSpring(1.1, { damping: 10, stiffness: 100 });
  };

  const onPressOut = () => {
    scaleAnim.value = withSpring(1, { damping: 10, stiffness: 100 });
  };

  const handleAction = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        // Se não estiver logado, redireciona para a tela de Registro
        navigation.navigate('RegistroUser');
      } else {
        // Ação normal – implemente a navegação para agendamento ou outra tela
        console.log('Usuário logado. Ação realizada:', actionLabel);
      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#4B0082', '#111827']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.serviceItem}
    >
      <Animated.View style={animatedStyle}>
        <FontAwesome
          name={icon as any}
          size={40}
          color="#00CC6A"
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        />
      </Animated.View>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
      {actionLabel && (
        <TouchableOpacity style={styles.button} onPress={handleAction}>
          {requiresBooking ? (
            <FontAwesome
              name="calendar"
              size={16}
              color="#fff"
              style={{ marginRight: 5 }}
            />
          ) : (
            <FontAwesome
              name="arrow-right"
              size={16}
              color="#fff"
              style={{ marginRight: 5 }}
            />
          )}
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
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
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00CC6A',
  },
  subtitle: {
    fontSize: 16,
    color: '#51B2D4',
    marginTop: 8,
    textAlign: 'center',
  },
  serviceContainer: {
    marginTop: 20,
  },
  serviceItem: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 5,
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
    flexDirection: 'row',
    backgroundColor: '#00CC6A',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ServicesScreen;

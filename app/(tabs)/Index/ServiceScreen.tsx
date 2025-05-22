import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import type { FC } from 'react';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

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
  // Serviços adicionais que demonstram a versatilidade do aplicativo
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

const ServicesScreen: FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com título e uma breve tagline */}
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

type ServiceItemProps = Service;

const ServiceItem: FC<ServiceItemProps> = ({
  icon,
  title,
  description,
  requiresBooking,
  actionLabel,
}) => {
  // Animação de escala para o ícone ao toque
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
    <LinearGradient
      colors={['#4B0082', '#111827']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.serviceItem}
    >
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
      {actionLabel && (
        <TouchableOpacity style={styles.button}>
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

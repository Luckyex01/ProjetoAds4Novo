import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Pressable
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import Login from '../Login';
import CadastroAtendimento from '../CadastroAtendimento';
import GerenciamentoAgendamento from '../../GerenciamentoAgendamento';

interface ServiceItemProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  description: string;
  requiresBooking: boolean;
  actionLabel: string;
}

type ViewKey = 'services' | 'login' | 'cadastro' | 'gerenciamento' | null;

const services: ServiceItemProps[] = [
  { icon: 'search', title: 'Tratamentos Faciais Avançados', description: 'Limpeza de pele, peelings químicos, laser facial e mais.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'heart', title: 'Tratamentos Corporais', description: 'Massagens, criolipólise, radiofrequência corporal e mais.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'cut', title: 'Tratamentos Capilares', description: 'Mesoterapia, terapia LED, PRP capilar e hidratação.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'stethoscope', title: 'Podologia', description: 'Tratamento de calos, unhas encravadas e reflexologia podal.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'leaf', title: 'Bem-Estar e Terapias Alternativas', description: 'Aromaterapia, acupuntura, reflexologia e reiki.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'stethoscope', title: 'Consulta Médica Online', description: 'Atendimento com médicos via telemedicina para diversas especialidades.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'flask', title: 'Exames Laboratoriais', description: 'Coleta de sangue, testes clínicos e diagnóstico laboratorial.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'heartbeat', title: 'Personal Trainer', description: 'Acompanhamento personalizado para treinos e dietas.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'child', title: 'Babá e Cuidador', description: 'Profissionais treinados para cuidar de crianças e idosos.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'car', title: 'Serviços Automotivos', description: 'Troca de óleo, revisão geral e lavagem especializada.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'wrench', title: 'Reparos Residenciais', description: 'Serviços de encanamento, elétrica e pequenos reparos.', requiresBooking: true, actionLabel: 'Agendar' },
  { icon: 'user', title: 'Gestão de Usuários e Cadastro', description: 'Administre cadastros, rastreie perfis e personalize a experiência do cliente.', requiresBooking: false, actionLabel: 'Ver Detalhes' },
  { icon: 'shopping-cart', title: 'Marketplace e Vendas Online', description: 'Integração com sistemas de e-commerce para produtos digitais e físicos.', requiresBooking: false, actionLabel: 'Confira' },
  { icon: 'line-chart', title: 'Relatórios e Análises', description: 'Acompanhe métricas, relatórios e KPIs para tomada de decisões estratégicas.', requiresBooking: false, actionLabel: 'Ver Relatórios' },
  { icon: 'cogs', title: 'Configuração e Manutenção', description: 'Serviços recorrentes para manter seu sistema atualizado e seguro.', requiresBooking: true, actionLabel: 'Contratar' }
];

export default function ServicesScreen() {
  const [modalView, setModalView] = useState<ViewKey>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 2000, useNativeDriver: false })
      ])
    ).start();
  }, []);
  const titleColor = fadeAnim.interpolate({ inputRange: [0, 1], outputRange: ['#00CC6A', '#4B0082'] });

  const handleAction = async (requiresBooking: boolean) => {
    if (!requiresBooking) return; // Pode ser modificado para abrir outra tela ou mostrar info
    const userType = await AsyncStorage.getItem('userType');
    setModalView(null);
    setTimeout(() => {
      if (userType === '1') setModalView('cadastro');
      else if (userType === '0') setModalView('gerenciamento');
      else setModalView('login');
    }, 300);
  };

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderModalContent = () => {
    switch (modalView) {
      case 'login': return <Login />;
      case 'cadastro': return <CadastroAtendimento />;
      case 'gerenciamento': return <GerenciamentoAgendamento />;
      default: return null;
    }
  };

  return (
    <LinearGradient colors={['#111827', '#1F2937']} style={styles.container}>
      <Animated.Text style={[styles.title, { color: titleColor }]}>Nossos Serviços</Animated.Text>
      <Animatable.Text animation="fadeInUp" delay={300} style={styles.subtitle}>
        Uma solução multifuncional para todas as necessidades empresariais.
      </Animatable.Text>

      <ScrollView contentContainerStyle={styles.serviceContainer}>
        {services.map((svc, idx) => (
          <Animatable.View key={idx} animation="fadeInUp" delay={idx * 150} style={styles.cardWrapper}>
            <LinearGradient
              colors={['#4B0082', '#111827']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceItem}
            >
              <FontAwesome name={svc.icon} size={40} color="#00CC6A" style={styles.icon} />
              <Text style={styles.serviceTitle}>{svc.title}</Text>
              <Text style={styles.serviceDescription}>{svc.description}</Text>
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  onPress={() => handleAction(svc.requiresBooking)}
                  style={styles.button}
                >
                  <FontAwesome name={svc.requiresBooking ? 'calendar' : 'info-circle'} size={20} color="white" />
                  <Text style={styles.buttonText}>{svc.actionLabel}</Text>
                </Pressable>
              </Animated.View>
            </LinearGradient>
          </Animatable.View>
        ))}
      </ScrollView>

      <Modal visible={modalView !== null} animationType="slide" onRequestClose={() => setModalView(null)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setModalView(null)}>
            <FontAwesome name="arrow-left" size={20} color="white" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {renderModalContent()}
          </ScrollView>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111827'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#9CA3AF',
    marginBottom: 20
  },
  serviceContainer: {
    paddingBottom: 30
  },
  cardWrapper: {
    marginBottom: 20
  },
  serviceItem: {
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5
  },
  icon: {
    marginBottom: 12
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 6
  },
  serviceDescription: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 12
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00CC6A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#00CC6A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 8
  },
  buttonText: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1F2937'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#4B0082'
  },
  backText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  }
});

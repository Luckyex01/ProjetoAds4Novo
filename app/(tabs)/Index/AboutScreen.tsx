import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AboutScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);
  
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      removeClippedSubviews
      overScrollMode="never"
    >
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/logoLuckyFly.png')} 
          style={styles.image} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>LuckyFly Technologies</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Fundação: <Text style={styles.highlight}>2024</Text>
          </Text>
          <Text style={styles.info}>
            Especialidade: <Text style={styles.highlight}>Soluções Digitais e Apps Multifuncionais</Text>
          </Text>
          <Text style={styles.info}>
            Idiomas: <Text style={styles.highlight}>Português, Inglês</Text>
          </Text>
          <Text style={styles.info}>
            Localização: <Text style={styles.highlight}>Brasília, Brasil</Text>
          </Text>
          <Text style={styles.info}>
            Disponibilidade: <Text style={styles.highlight}>24/7</Text>
          </Text>
          <Text style={styles.info}>
            Missão: <Text style={styles.highlight}>Facilitar a vida de empresas e usuários com inovação, design e usabilidade intuitiva.</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Conheça Mais</Text>
        </TouchableOpacity>
      </View>

      <StatsContainer />

      {/* Modal de Saiba Mais */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient 
            colors={['#1F2937', '#141E30']}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>Sobre a LuckyFly</Text>
            <Text style={styles.modalDescription}>
              A LuckyFly é especializada no desenvolvimento de aplicativos multifuncionais e soluções tecnológicas que transformam o dia a dia das empresas.
              Com foco em inovação e usabilidade, entregamos ferramentas de agendamento, fidelização, controle de acesso e automação – tudo para tornar sua rotina
              mais eficiente e impactante, sempre com um design moderno e acolhedor.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </ScrollView>
  );
};

const StatsContainer = memo(() => {
  return (
    <View style={styles.statsContainer}>
      <StatBox number="10+" text="Módulos Personalizados" />
      <StatBox number="500+" text="Clientes Atendidos" />
      <StatBox number="99%" text="Satisfação dos Usuários" />
      <StatBox number="100%" text="Foco em Inovação" />
    </View>
  );
});

interface StatBoxProps {
  number: string;
  text: string;
}

const StatBox: React.FC<StatBoxProps> = memo(({ number, text }) => {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statText}>{text}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111827', // Fundo escuro original
    alignItems: 'center',
    minHeight: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#00CC6A',
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00CC6A',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 5,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#51B2D4',
  },
  button: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  statBox: {
    backgroundColor: '#1F2937',
    padding: 15,
    margin: 6,
    borderRadius: 12,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00CC6A',
  },
  statText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#D1D5DB',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    maxHeight: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#E5E7EB',
    marginBottom: 20,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AboutScreen;

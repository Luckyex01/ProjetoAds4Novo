import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';

const AboutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/logo LuckyFly.png')} 
          style={styles.image} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>LuckyFly Technologies</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>Fundação: <Text style={styles.highlight}>2024</Text></Text>
          <Text style={styles.info}>Especialidade: <Text style={styles.highlight}>Soluções Digitais e Apps Multifuncionais</Text></Text>
          <Text style={styles.info}>Idiomas: <Text style={styles.highlight}>Português, Inglês</Text></Text>
          <Text style={styles.info}>Localização: <Text style={styles.highlight}>Brasília, Brasil</Text></Text>
          <Text style={styles.info}>Disponibilidade: <Text style={styles.highlight}>24/7</Text></Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Conheça Mais</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>10+</Text>
          <Text style={styles.statText}>Módulos Personalizados</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>500+</Text>
          <Text style={styles.statText}>Clientes Atendidos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>99%</Text>
          <Text style={styles.statText}>Satisfação dos Usuários</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statText}>Foco em Inovação</Text>
        </View>
      </View>

      {/* Modal de Saiba Mais */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sobre a LuckyFly</Text>
            <Text style={styles.modalDescription}>
              A LuckyFly é especializada no desenvolvimento de aplicativos multifuncionais e soluções tecnológicas que transformam o dia a dia das empresas. 
              Desde agendamento e fidelização até controle de acesso e automação, entregamos inovação com design impactante e usabilidade intuitiva.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111827', // Fundo escuro
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#E5E7EB',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AboutScreen;

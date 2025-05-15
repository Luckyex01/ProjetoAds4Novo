import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView
} from 'react-native';
import { BlurView } from 'expo-blur';

type FilterType = 'all' | 'facial' | 'corporal' | 'outros';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const openDescriptionModal = (description: string) => {
    setSelectedDescription(description);
    setIsModalVisible(true);
  };

  const closeDescriptionModal = () => {
    setIsModalVisible(false);
    setSelectedDescription(null);
  };

  const portfolioItems = [
    {
      id: '1',
      imgSrc: require('../../../assets/images/p1.png'),
      category: 'facial',
      title: 'Tratamentos Faciais Avançados',
      description: 'Limpeza de pele, peelings químicos, laser facial e mais.',
    },
    {
      id: '2',
      imgSrc: require('../../../assets/images/p2.png'),
      category: 'corporal',
      title: 'Tratamentos Corporais',
      description: 'Massagens, criolipólise, radiofrequência corporal e mais.',
    },
    {
      id: '3',
      imgSrc: require('../../../assets/images/p3.png'),
      category: 'corporal',
      title: 'Tratamentos Capilares',
      description: 'Mesoterapia, terapia LED, PRP capilar e hidratação.',
    },
    {
      id: '4',
      imgSrc: require('../../../assets/images/p4.png'),
      category: 'corporal',
      title: 'Podologia',
      description: 'Tratamento de calos, unhas encravadas, reflexologia podal.',
    },
    {
      id: '5',
      imgSrc: require('../../../assets/images/p5.png'),
      category: 'outros',
      title: 'Bem-Estar e Terapias Alternativas',
      description: 'Aromaterapia, acupuntura, reflexologia e reiki.',
    },
    {
      id: '6',
      imgSrc: require('../../../assets/images/p6.png'),
      category: 'outros',
      title: 'Consulta Médica Online',
      description: 'Atendimento com médicos via telemedicina para diversas especialidades.',
    },
    {
      id: '7',
      imgSrc: require('../../../assets/images/p1.png'),
      category: 'outros',
      title: 'Exames Laboratoriais',
      description: 'Coleta de sangue, testes clínicos e diagnóstico laboratorial.',
    },
    {
      id: '8',
      imgSrc: require('../../../assets/images/p2.png'),
      category: 'outros',
      title: 'Personal Trainer',
      description: 'Acompanhamento personalizado para treinos e dietas.',
    },
    {
      id: '9',
      imgSrc: require('../../../assets/images/p3.png'),
      category: 'outros',
      title: 'Babá e Cuidador',
      description: 'Profissionais treinados para cuidar de crianças e idosos.',
    },
    {
      id: '10',
      imgSrc: require('../../../assets/images/p4.png'),
      category: 'outros',
      title: 'Serviços Automotivos',
      description: 'Troca de óleo, revisão geral e lavagem especializada.',
    },
    {
      id: '11',
      imgSrc: require('../../../assets/images/p5.png'),
      category: 'outros',
      title: 'Reparos Residenciais',
      description: 'Serviços de encanamento, elétrica e pequenos reparos.',
    },
  ];

  const filteredItems = portfolioItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>Serviços</Text>
            <View style={styles.filters}>
              <TouchableOpacity
                style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
                onPress={() => handleFilterChange('all')}>
                <Text style={styles.filterText}>Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, activeFilter === 'facial' && styles.activeFilter]}
                onPress={() => handleFilterChange('facial')}>
                <Text style={styles.filterText}>Faciais</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, activeFilter === 'corporal' && styles.activeFilter]}
                onPress={() => handleFilterChange('corporal')}>
                <Text style={styles.filterText}>Corporais</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, activeFilter === 'outros' && styles.activeFilter]}
                onPress={() => handleFilterChange('outros')}>
                <Text style={styles.filterText}>Outros</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={filteredItems}
        renderItem={({ item }) => (
          <View style={styles.portfolioItem}>
            <Image source={item.imgSrc} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => openDescriptionModal(item.description)}>
                <Text style={styles.viewButtonText}>Informações do Serviço</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDescriptionModal}>
        <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill}>
          <View style={styles.modalContentWrapper}>
            <View style={styles.descriptionBox}>
              <ScrollView>
                <Text style={styles.modalDescription}>{selectedDescription}</Text>
              </ScrollView>
              <TouchableOpacity style={styles.modalCloseButton} onPress={closeDescriptionModal}>
                <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00CC6A',
    textAlign: 'center',
    marginBottom: 20,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#4B0082',
  },
  activeFilter: {
    backgroundColor: '#00CC6A',
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  portfolioItem: {
    marginBottom: 20,
    backgroundColor: '#1F2937',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 12,
    backgroundColor: '#111827',
  },
  title: {
    color: '#51B2D4',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  viewButton: {
    backgroundColor: '#00CC6A',
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#111827',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  descriptionBox: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
  },
  modalDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#00CC6A',
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalCloseText: {
    color: '#111827',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Portfolio;

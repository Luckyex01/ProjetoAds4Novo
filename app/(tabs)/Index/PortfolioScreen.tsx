import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

// Definindo os tipos de filtro, agora com mais categorias
type FilterType =
  | 'all'
  | 'facial'
  | 'corporal'
  | 'automotivo'
  | 'academico'
  | 'social'
  | 'tecnologico'
  | 'outros';

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

  // Array de itens do portfolio com novas categorias e imagens atualizadas
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
      imgSrc: require('../../../assets/images/ConsultaMedica.png'),
      category: 'outros',
      title: 'Consulta Médica Online',
      description:
        'Atendimento com médicos via telemedicina para diversas especialidades.',
    },
    {
      id: '7',
      imgSrc: require('../../../assets/images/ExamesLaborais.png'),
      category: 'outros',
      title: 'Exames Laboratoriais',
      description:
        'Coleta de sangue, testes clínicos e diagnóstico laboratorial.',
    },
    {
      id: '8',
      imgSrc: require('../../../assets/images/PersonalTrainer.png'),
      category: 'outros',
      title: 'Personal Trainer',
      description: 'Acompanhamento personalizado para treinos e dietas.',
    },
    {
      id: '9',
      imgSrc: require('../../../assets/images/BabaeCuidador.png'),
      category: 'outros',
      title: 'Babá e Cuidador',
      description: 'Profissionais treinados para cuidar de crianças e idosos.',
    },
    {
      id: '10',
      imgSrc: require('../../../assets/images/ServicosAutomotivos.png'),
      category: 'automotivo',
      title: 'Serviços Automotivos',
      description: 'Troca de óleo, revisão geral e lavagem especializada.',
    },
    {
      id: '11',
      imgSrc: require('../../../assets/images/ReparosResidenciais.png'),
      category: 'outros',
      title: 'Reparos Residenciais',
      description: 'Serviços de encanamento, elétrica e pequenos reparos.',
    },
    {
      id: '12',
      imgSrc: require('../../../assets/images/RevisaoAutomotiva.png'),
      category: 'automotivo',
      title: 'Revisão e Manutenção Automotiva',
      description:
        'Verificação completa, manutenção preventiva e reparos especializados.',
    },
    {
      id: '13',
      imgSrc: require('../../../assets/images/AulasParticulares.png'),
      category: 'academico',
      title: 'Aulas Particulares',
      description: 'Aulas de matemática, física, química e outras disciplinas.',
    },
    {
      id: '14',
      imgSrc: require('../../../assets/images/CursosOnline.png'),
      category: 'academico',
      title: 'Cursos Online',
      description:
        'Plataforma de ensino com cursos variados para aprimorar habilidades.',
    },
    {
      id: '15',
      imgSrc: { uri: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      category: 'social',
      title: 'Social Media Management',
      description:
        'Gerenciamento de redes sociais e estratégias digitais eficazes.',
    },
    {
      id: '16',
      imgSrc: { uri: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      category: 'social',
      title: 'Marketing de Influência',
      description:
        'Promoção de marcas através de influenciadores e conteúdo digital.',
    },
    {
      id: '17',
      imgSrc: require('../../../assets/images/SuporteTecnico.png'),
      category: 'tecnologico',
      title: 'Suporte Técnico de TI',
      description:
        'Manutenção de hardware, suporte em redes e assistência técnica especializada.',
    },
    {
      id: '18',
      imgSrc: { uri: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      category: 'tecnologico',
      title: 'Desenvolvimento de Software',
      description:
        'Criação de aplicativos, websites e sistemas personalizados para sua empresa.',
    },
    {
      id: '19',
      imgSrc: { uri: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      category: 'facial',
      title: 'Tratamento Facial: Botox & Preenchimento',
      description:
        'Procedimentos estéticos para rejuvenescimento e realce dos traços faciais.',
    },
  ];

  const filteredItems = portfolioItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho: título e opções de filtro */}
      <View style={styles.header}>
        <Text style={styles.heading}>Serviços</Text>
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
            onPress={() => handleFilterChange('all')}
          >
            <Text style={styles.filterText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'facial' && styles.activeFilter]}
            onPress={() => handleFilterChange('facial')}
          >
            <Text style={styles.filterText}>Faciais</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'corporal' && styles.activeFilter]}
            onPress={() => handleFilterChange('corporal')}
          >
            <Text style={styles.filterText}>Corporais</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'automotivo' && styles.activeFilter]}
            onPress={() => handleFilterChange('automotivo')}
          >
            <Text style={styles.filterText}>Automotivos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'academico' && styles.activeFilter]}
            onPress={() => handleFilterChange('academico')}
          >
            <Text style={styles.filterText}>Acadêmicos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'social' && styles.activeFilter]}
            onPress={() => handleFilterChange('social')}
          >
            <Text style={styles.filterText}>Social</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'tecnologico' && styles.activeFilter]}
            onPress={() => handleFilterChange('tecnologico')}
          >
            <Text style={styles.filterText}>Tecnológicos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, activeFilter === 'outros' && styles.activeFilter]}
            onPress={() => handleFilterChange('outros')}
          >
            <Text style={styles.filterText}>Outros</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de itens do portfólio */}
      <FlatList
        data={filteredItems}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" delay={index * 100} style={styles.portfolioItem}>
            <LinearGradient
              colors={['#4B0082', '#111827']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <Image source={item.imgSrc} style={styles.image} />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => openDescriptionModal(item.description)}
                >
                  <Text style={styles.infoButtonText}>Informações do Serviço</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animatable.View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal para exibir a descrição */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDescriptionModal}
      >
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
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00CC6A',
    textAlign: 'center',
    marginBottom: 10,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  listContainer: {
    paddingBottom: 30,
  },
  portfolioItem: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  cardGradient: {
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: 180,
  },
  itemContent: {
    backgroundColor: '#111827',
    padding: 12,
    alignItems: 'center',
  },
  itemTitle: {
    color: '#51B2D4',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoButton: {
    backgroundColor: '#00CC6A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  infoButtonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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

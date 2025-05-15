import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';

interface Testimonial {
  image?: any;
  imageUrl?: string;
  comment: string;
  name: string;
  role: string;
}

// Perfis antigos com imagens locais (Perfil1 a Perfil5)
const localTestimonials: Testimonial[] = [
  {
    image: require('../../../assets/images/Perfil1.png'),
    comment:
      'Estou muito feliz com os resultados do tratamento de rejuvenescimento facial. A equipe é extremamente profissional e atenciosa. Recomendo!',
    name: 'Carla Silva',
    role: 'Cliente Satisfeita',
  },
  {
    image: require('../../../assets/images/Perfil2.png'),
    comment:
      'Os tratamentos realmente fazem a diferença. Ambiente acolhedor e resultados incríveis!',
    name: 'Marcos Oliveira',
    role: 'Cliente Fiel',
  },
  {
    image: require('../../../assets/images/Perfil3.png'),
    comment:
      'Excelente atendimento e resultados espetaculares. Recomendo para todos!',
    name: 'Patrícia Santos',
    role: 'Cliente Satisfeita',
  },
  {
    image: require('../../../assets/images/Perfil4.png'),
    comment:
      'Profissionais competentes e ambiente acolhedor. Sempre saio renovado!',
    name: 'Lucas Mendes',
    role: 'Cliente Satisfeito',
  },
  {
    image: require('../../../assets/images/Perfil5.png'),
    comment:
      'Amo os tratamentos de skincare. Minha pele nunca esteve tão radiante!',
    name: 'Ana Clara',
    role: 'Cliente Satisfeita',
  },
];

// Perfis das celebridades com URLs
const celebrityTestimonials: Testimonial[] = [
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/7e/Michael_B._Jordan_by_Gage_Skidmore_2.jpg',
    comment:
      '"Bruh, that personal trainer module gave me gains on gains. LuckyApps, vocês são f*da!"',
    name: 'Michael B. Jordan',
    role: 'Ator / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/0b/Playboi_Carti_2021.jpg',
    comment:
      '"Yo, a radiofrequência corporal deles é next level. Já quero reservar de novo!"',
    name: 'Playboi Carti',
    role: 'Rapper / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/87/Kanye_West_2012.jpg',
    comment:
      '"Innovation never sleeps — e LuckyApps tampoco. Telemedicina foi mind-blowing."',
    name: 'Kanye West',
    role: 'Artista / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Lula_Mandetta.jpg',
    comment:
      '"É um serviço de excelência! Consulta online rapidão, sem burocracia."',
    name: 'Luiz Inácio Lula da Silva',
    role: 'Presidente / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/94/Jair_Bolsonaro_by_Valter_Campanato_%28Ag%C3%AAncia_Brasil%29.jpg',
    comment:
      '"Parabéns ao time, agendei meu tratamento e foi tranquilo como um domingo de pescaria."',
    name: 'Jair Bolsonaro',
    role: 'Ex-Presidente / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Dilma_Rousseff_em_2016.jpg',
    comment:
      '"Fiquei encantada com o acolhimento. Recomendo a LuckyApps a todo brazuca!"',
    name: 'Dilma Rousseff',
    role: 'Ex-Presidente / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Neymar_2018.jpg',
    comment:
      '"Depois da criolipólise, tô pronto pra próxima temporada. É jogo!"',
    name: 'Neymar Jr.',
    role: 'Atleta / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/9f/Gisele_B%C3%BCndchen_2019.jpg',
    comment:
      '"Skincare on point! Nunca estive tão confiante. Obrigada, LuckyApps."',
    name: 'Gisele Bündchen',
    role: 'Modelo / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/Ivete_Sangalo_2012.jpg',
    comment:
      '"Amei o clima da clínica. Dá até vontade de dançar forró de animação!"',
    name: 'Ivete Sangalo',
    role: 'Cantora / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Xuxa_2011.jpg',
    comment:
      '"Ui! Que brisa boa de atendimento! Me senti uma rainha."',
    name: 'Xuxa Meneghel',
    role: 'Apresentadora / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Zumbi_dos_Palmares.jpg',
    comment:
      '"Nossa história foi bem cuidada — respeito total. Gratidão eterna."',
    name: 'Zumbi dos Palmares',
    role: 'Ícone Histórico / Cliente VIP',
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/4f/Wagner_Moura_CCCSXIX.jpg',
    comment:
      '"Como ator, valorizo qualidade. A teleconsultoria da LuckyApps foi impecável."',
    name: 'Wagner Moura',
    role: 'Ator / Cliente VIP',
  },
];

const TestimonialScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    ...localTestimonials,
    ...celebrityTestimonials,
  ]);

  const addTestimonial = () => {
    if (!newName || !newComment) {
      alert('Preencha nome e comentário, beleza?');
      return;
    }
    setTestimonials([
      {
        imageUrl: 'https://via.placeholder.com/100.png?text=Novo',
        name: newName,
        comment: newComment,
        role: 'Novo Cliente',
      },
      ...testimonials,
    ]);
    setModalVisible(false);
    setNewName('');
    setNewComment('');
  };

  const { width } = Dimensions.get('window');
  const imgSize = width * 0.25;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.testimonialList}>
        {testimonials.map((t, i) => (
          <View key={i} style={styles.testimonialItem}>
            {t.image ? (
              <Image source={t.image} style={[styles.image, { width: imgSize, height: imgSize }]} />
            ) : (
              <Image
                source={{ uri: t.imageUrl! }}
                style={[styles.image, { width: imgSize, height: imgSize }]}
              />
            )}
            <Text style={styles.quoteIcon}>“</Text>
            <Text style={styles.comment}>{t.comment}</Text>
            <View style={styles.intro}>
              <Text style={styles.name}>{t.name}</Text>
              <Text style={styles.role}>{t.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Comentário</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Novo Depoimento</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#888"
                value={newName}
                onChangeText={setNewName}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Seu comentário"
                placeholderTextColor="#888"
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalBtn} onPress={addTestimonial}>
                  <Text style={styles.modalBtnText}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: '#4B0082' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalBtnText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
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
    paddingVertical: 20,
  },
  testimonialList: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  testimonialItem: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    width: '90%',
    padding: 16,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: 12,
    resizeMode: 'cover',
    aspectRatio: 1,
  },
  quoteIcon: {
    fontSize: 48,
    color: '#4B0082',
    position: 'absolute',
    top: 8,
    left: 16,
  },
  comment: {
    fontSize: 16,
    color: '#E5E7EB',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  intro: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00CC6A',
  },
  role: {
    fontSize: 14,
    color: '#51B2D4',
  },
  addButton: {
    backgroundColor: '#00CC6A',
    marginHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#111827',
    color: '#E5E7EB',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalBtn: {
    backgroundColor: '#00CC6A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalBtnText: {
    color: '#111827',
    fontWeight: 'bold',
  },
});

export default TestimonialScreen;

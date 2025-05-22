import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface Testimonial {
  image?: any;
  imageUrl?: string;
  comment: string;
  name: string;
  role: string;
}

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
    comment: 'Excelente atendimento e resultados espetaculares. Recomendo para todos!',
    name: 'Patrícia Santos',
    role: 'Cliente Satisfeita',
  },
  {
    image: require('../../../assets/images/Perfil4.png'),
    comment: 'Profissionais competentes e ambiente acolhedor. Sempre saio renovado!',
    name: 'Lucas Mendes',
    role: 'Cliente Satisfeito',
  },
  {
    image: require('../../../assets/images/Perfil5.png'),
    comment: 'Amo os tratamentos de skincare. Minha pele nunca esteve tão radiante!',
    name: 'Ana Clara',
    role: 'Cliente Satisfeita',
  },
];

const celebrityTestimonials: Testimonial[] = [
  {
    image: require('../../../assets/images/michael.png'),
    comment:
      '"Bruh, that personal trainer module gave me gains on gains. LuckyApps, vocês são f*da!"',
    name: 'Michael B. Jordan',
    role: 'Ator / Cliente VIP',
  },
  {
    image: require('../../../assets/images/playboycarti.png'),
    comment:
      '"Yo, a radiofrequência corporal deles é next level. Já quero reservar de novo!"',
    name: 'Playboi Carti',
    role: 'Rapper / Cliente VIP',
  },
  {
    image: require('../../../assets/images/kanye.png'),
    comment:
      '"Innovation never sleeps — e LuckyApps tampoco. Telemedicina foi mind-blowing."',
    name: 'Kanye West',
    role: 'Artista / Cliente VIP',
  },
  {
    image: require('../../../assets/images/lula.png'),
    comment:
      '"É um serviço de excelência! Consulta online rapidão, sem burocracia."',
    name: 'Luiz Inácio Lula da Silva',
    role: 'Presidente / Cliente VIP',
  },
  {
    image: require('../../../assets/images/bolsonaro.png'),
    comment:
      '"Parabéns ao time, agendei meu tratamento e foi tranquilo como um domingo de pescaria."',
    name: 'Jair Bolsonaro',
    role: 'Ex-Presidente / Cliente VIP',
  },
  {
    image: require('../../../assets/images/dilma.png'),
    comment:
      '"Fiquei encantada com o acolhimento. Recomendo a LuckyApps a todo brazuca!"',
    name: 'Dilma Rousseff',
    role: 'Ex-Presidente / Cliente VIP',
  },
  {
    image: require('../../../assets/images/neymar.png'),
    comment:
      '"Depois da criolipólise, tô pronto pra próxima temporada. É jogo!"',
    name: 'Neymar Jr.',
    role: 'Atleta / Cliente VIP',
  },
  {
    image: require('../../../assets/images/gisele.png'),
    comment:
      '"Skincare on point! Nunca estive tão confiante. Obrigada, LuckyApps."',
    name: 'Gisele Bündchen',
    role: 'Modelo / Cliente VIP',
  },
  {
    image: require('../../../assets/images/ivete.png'),
    comment:
      '"Amei o clima da clínica. Dá até vontade de dançar forró de animação!"',
    name: 'Ivete Sangalo',
    role: 'Cantora / Cliente VIP',
  },
  {
    image: require('../../../assets/images/xuxa.png'),
    comment:
      '"Ui! Que brisa boa de atendimento! Me senti uma rainha."',
    name: 'Xuxa Meneghel',
    role: 'Apresentadora / Cliente VIP',
  },
  {
    image: require('../../../assets/images/zumbi.png'),
    comment:
      '"Nossa história foi bem cuidada — respeito total. Gratidão eterna."',
    name: 'Zumbi dos Palmares',
    role: 'Ícone Histórico / Cliente VIP',
  },
  {
    image: require('../../../assets/images/wagner.png'),
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
  const scrollRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');
  const imgSize = width * 0.25;

  const fadeAnims = useRef<Animated.Value[]>(
    testimonials.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    fadeAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const addTestimonial = () => {
    if (!newName || !newComment) {
      alert('Preencha nome e comentário, beleza?');
      return;
    }
    const newTestimonial: Testimonial = {
      imageUrl: 'https://via.placeholder.com/100.png?text=Novo',
      name: newName,
      comment: newComment,
      role: 'Novo Cliente',
    };
    setTestimonials([newTestimonial, ...testimonials]);
    fadeAnims.unshift(new Animated.Value(0));
    setModalVisible(false);
    setNewName('');
    setNewComment('');

    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      Animated.timing(fadeAnims[0], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 100);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.testimonialList} ref={scrollRef}>
        {testimonials.map((t, i) => (
          <Animated.View
            key={i}
            style={[styles.testimonialItem, { opacity: fadeAnims[i] }]}
          >
            <LinearGradient
              colors={['#1F2937', '#511097']}
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 2 }}
              style={styles.gradient}
            >
              {t.image ? (
                <Image
                  source={t.image}
                  style={[styles.image, { width: imgSize, height: imgSize }]}
                />
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
            </LinearGradient>
          </Animated.View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
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
    width: '90%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 2, // Adicionando a borda fina
    borderColor: '#4B0082', // Cor da borda (pode ser ajustada)
  },
  gradient: {
    padding: 16,
    borderRadius: 12,
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

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Dimensions,
  ScrollView,
} from 'react-native';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  link: string;
  isFeatured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Como prevenir o envelhecimento da pele com tratamentos avançados',
    date: '28 de abril de 2025',
    author: 'AM Dermatologia',
    image:
      'https://amdermatologia.com.br/wp-content/uploads/2025/04/envelhecimento-da-pele-1024x683.jpg',
    link: 'https://amdermatologia.com.br/blog/como-prevenir-o-envelhecimento-da-pele-com-tratamentos-avancados-e-cuidados-diarios/',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Criolipólise Funciona: Saiba Toda a Verdade',
    date: '10 de março de 2024',
    author: 'BodyScience',
    image:
      'https://blog.bodyscience.pt/wp-content/uploads/criolipolise-funciona-1024x683.png',
    link: 'https://blog.bodyscience.pt/criolipolise-funciona/',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Mesoterapia versus PRP: Guia para perda de cabelo',
    date: '15 de fevereiro de 2025',
    author: 'Diaminy Aesthetics',
    image:
      'https://diaminyaesthetics.com/cdn/shop/articles/meso_for_hair_42b113c1-6380-45ef-b132-367f71d66f42.jpg?v=1740722238&width=1200',
    link: 'https://pt.diaminyaesthetics.com/blogs/news/mesotherapy-vs-prp-for-hair-loss',
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Calos e Calosidades: Quando procurar um podólogo',
    date: '20 de abril de 2025',
    author: 'Podosafe',
    image: 'https://podosafe.com/2021/7/20-calos-e-calosidade-podologo.jpg',
    link: 'https://podosafe.com/calosidades',
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Terapias Alternativas: Aromaterapia e Acupuntura',
    date: '5 de fevereiro de 2025',
    author: 'Blog Saúde Bem Estar',
    image:
      'https://images.unsplash.com/photo-1730977806288-96b82f795008?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: 'https://blogsaudebemestar.com/terapias-alternativas-como-aromaterapia-e-acupuntura-podem-ajudar/',
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Consultas por telemedicina: o que são e como funcionam',
    date: '10 de março de 2023',
    author: 'AdvanceCare',
    image:
      'https://www.advancecare.pt/-/media/images/article/telemedicina.png?la=pt-pt&hash=C10D87C528714FCCEE3386415FC50177',
    link: 'https://www.advancecare.pt/para-si/blog/artigos/consultas-por-telemedicina-o-que-sao-e-como-funcionam',
    isFeatured: true,
  },
  {
    id: '7',
    title: 'Exames laboratoriais: tipos de coleta',
    date: '15 de março de 2025',
    author: 'Vinci Lab',
    image:
      'https://vincilab.com.br/cdn/shop/articles/Oral-Swab.jpg?v=1743613854&width=1400',
    link: 'https://vincilab.com.br/blogs/news/exames-laboratoriais-conheca-os-tipos-de-coleta',
    isFeatured: true,
  },
  {
    id: '8',
    title: 'Importância do acompanhamento com personal trainer e nutricionista',
    date: '7 de maio de 2025',
    author: 'Magg',
    image:
      'https://thumbs.web.sapo.io/?W=1550&H=0&png=1&delay_optim=1&webp=1&epic=NTUz48u5kIJhGmgzt1o+K8Zk9tp6nrnK89clOwxTPiKtm1Nsvfo35UJx2Lw0niliv3Uo+wEtJ1E+DlP5sdoSqiBtRIaAa3YmAmnxesFXLkT383Q=',
    link: 'https://magg.sapo.pt/vida-saudavel/artigos/holmes-place-acompanhamento',
    isFeatured: true,
  },
  {
    id: '9',
    title: 'Cuidador de Idoso: Tarefas e Responsabilidades',
    date: '10 de abril de 2025',
    author: 'Sofia.pt',
    image:
      'https://cdn.prod.website-files.com/645260b31ca49db9ec6deff7/67a6542acf08a754e6b186e2_Cuidadores%20de%20Idosos-p-1600.webp',
    link: 'https://www.sofia.pt/blog/artigos-blog/cuidadores-de-idosos-guia-essencial-sobre-tarefas-e-responsabilidades',
    isFeatured: true,
  },
  {
    id: '10',
    title: 'Troca de Óleo e Filtros: Guia Completo',
    date: '20 de março de 2025',
    author: 'Lucar Pneus',
    image:
      'https://i0.wp.com/lucarpneus.com/wp-content/uploads/2024/06/Troca-de-O%CC%81leo-e-Filtros-Guia-Completo-para-um-Motor-Sauda%CC%81vel.jpg?w=1080&ssl=1',
    link: 'https://lucarpneus.com/troca-de-oleo-e-filtros-guia-completo-para-um-motor-saudavel/',
    isFeatured: true,
  },
  {
    id: '11',
    title: '18 pequenos reparos que você mesmo pode fazer',
    date: '10 de janeiro de 2021',
    author: 'Blog da Tenda',
    image:
      'https://www.tenda.com/blog/wp-content/uploads/2021/07/Reparos-para-fazer-voce-mesmo-desktop.jpg',
    link: 'https://www.tenda.com/blog/casa-e-decoracao/pequenos-reparos-que-voce-mesmo-pode-fazer-em-casa',
    isFeatured: true,
  },
];

const BlogScreen: React.FC = () => {
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-10, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const featuredPosts = blogPosts.filter((post) => post.isFeatured);

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const renderItem = ({ item }: { item: BlogPost }) => (
    <Animated.View entering={FadeInUp} style={styles.blogItem}>
      <LinearGradient
        colors={['#4B0082', '#00CC6A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        <View style={styles.cardInner}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.author} - {item.date}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
                <Icon name="heart" size={24} color="#800080" />
                <Text style={styles.likeCount}>{likes[item.id] || 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(item.link)}
                style={styles.readMoreButton}
              >
                <Text style={styles.readMoreText}>Leia mais →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>Notícias e Artigos</Text>
            <Carousel
              width={width}
              height={250}
              autoPlay
              data={featuredPosts}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.link)}
                  style={styles.carouselItem}
                >
                  <Image source={{ uri: item.image }} style={styles.carouselImage} />
                  <View style={styles.carouselContent}>
                    <Text style={styles.carouselTitle}>{item.title}</Text>
                    <Text style={styles.carouselMeta}>
                      {item.author} - {item.date}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <Animated.View style={[styles.arrowContainer, arrowStyle]}>
              <Icon name="chevron-down" size={128} color="#800080" />
            </Animated.View>
            <View style={{ height: 20 }} />
          </>
        }
        data={blogPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  blogItem: {
    marginBottom: 20,
  },
  gradientBorder: {
    borderRadius: 12,
    padding: 2,
  },
  cardInner: {
    backgroundColor: '#1f2937',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 5,
  },
  meta: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 16,
    color: '#4B0082',
  },
  readMoreButton: {
    backgroundColor: '#00CC6A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  readMoreText: {
    color: '#111827',
    fontWeight: 'bold',
  },
  carouselItem: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 250,
  },
  carouselContent: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
  },
  carouselTitle: {
    color: '#51B2D4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carouselMeta: {
    color: '#E5E7EB',
    fontSize: 12,
  },
  arrowContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  arrow: {
    fontSize: 64,
    color: '#800080',
  },
});

export default BlogScreen;

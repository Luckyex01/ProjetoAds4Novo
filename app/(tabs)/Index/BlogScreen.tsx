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
import Animated, { FadeInUp } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    image: 'https://amdermatologia.com.br/wp-content/uploads/2023/11/tratamentos-faciais.png',
    link: 'https://amdermatologia.com.br/blog/como-prevenir-o-envelhecimento-da-pele-com-tratamentos-avancados-e-cuidados-diarios/',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Criolipólise Funciona: Saiba Toda a Verdade',
    date: '10 de março de 2024',
    author: 'BodyScience',
    image: 'https://blog.bodyscience.pt/wp-content/uploads/2023/01/criolipolise.png',
    link: 'https://blog.bodyscience.pt/criolipolise-funciona/',
    isFeatured: true,
  },
  // ... (outros posts mantidos da estrutura anterior)
];

const BlogScreen: React.FC = () => {
  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  const handleLike = (id: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1,
    }));
  };

  const featuredPosts = blogPosts.filter((post) => post.isFeatured);

  const renderItem = ({ item }: { item: BlogPost }) => (
    <Animated.View entering={FadeInUp} style={styles.blogItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.author} - {item.date}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => handleLike(item.id)}
            style={styles.likeButton}
          >
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
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
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

      <FlatList
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
    backgroundColor: '#D2B48C',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  blogItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
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
    color: '#2c3e50',
    marginBottom: 5,
  },
  meta: {
    fontSize: 14,
    color: '#7f8c8d',
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
    color: '#800080',
  },
  readMoreButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  readMoreText: {
    color: '#fff',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carouselMeta: {
    color: '#ccc',
    fontSize: 12,
  },
});

export default BlogScreen;

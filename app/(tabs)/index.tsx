import React, { useEffect, useState, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Image } from 'react-native';

export default function HomeScreen() {
  const [typingText, setTypingText] = useState('');
  // Use useRef para criar os valores animados (evita recriação desnecessária)
  const fadeAnim = useRef(new Animated.Value(1)).current; // Opacidade do texto
  const imageAnim = useRef(new Animated.Value(0)).current; // Animação da imagem

  const typeStrings = [
    'Agendamento dos seus serviços com facilidade!',
    'Gerenciamento da sua empresa de forma digital!',
    'Check-in e controle de acesso simplificado!',
    'Fidelização de clientes com benefícios exclusivos!',
    'Uma transformação do seu negócio com um app multifuncional!',
    'Personalização de módulos para atender às suas necessidades!',
    'Um processo de digitalização para aumentar sua eficiência!',
    'A melhor experiência para seus clientes, na palma da mão!',
    'A automatização do seu atendimento otimiza seu tempo!',
    'Uma solução inovadora para o seu negócio crescer!',
  ];

  const textIndexRef = useRef(0);

  // Função para atualizar o texto: primeiro fade out, atualizar, e então fade in.
  const animateTextChange = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Atualiza o texto enquanto está invisível
      textIndexRef.current = (textIndexRef.current + 1) % typeStrings.length;
      setTypingText(typeStrings[textIndexRef.current]);
      // Agora, fade in com a nova mensagem
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    // Inicia com a primeira mensagem
    setTypingText(typeStrings[textIndexRef.current]);
    // Define o intervalo para atualizar o texto
    const intervalId = setInterval(animateTextChange, 4500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Animação de fade-in e zoom-in da imagem
    Animated.timing(imageAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Imagem animada */}
      <Animated.View
        style={[
          styles.imageWrapper,
          { opacity: imageAnim, transform: [{ scale: imageAnim }] },
        ]}
      >
        <Image
          source={require('../../assets/images/logoLuckyFly.png')}
          style={styles.image}
        />
      </Animated.View>

      {/* Área de texto animada */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Bem-vindo à LuckyFly!</Text>
        <Text style={styles.subtitle}>
          Nós fornecemos <Text style={styles.typingText}>{typingText}</Text>
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827', // Fundo principal escuro
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100, // Forma circular
    overflow: 'hidden',
    borderColor: '#00CC6A', // Bordas em neon verde
    borderWidth: 4,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00CC6A', // Título em neon verde
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#51B2D4', // Azul ciano para subtítulo
  },
  typingText: {
    color: '#00CC6A', // Texto dinâmico em neon verde
    fontWeight: 'bold',
    fontSize: 36,
  },
});

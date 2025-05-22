import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [typingText, setTypingText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Inicializa a animação de opacidade
  const [imageAnim] = useState(new Animated.Value(0)); // Inicializa a animação de escala da imagem

  useEffect(() => {
    // Função para limpar o AsyncStorage ao reiniciar a aplicação
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear(); // Limpa todos os dados armazenados
        console.log('AsyncStorage limpo com sucesso!');
      } catch (error) {
        console.error('Erro ao limpar o AsyncStorage:', error);
      }
    };

    // Lógica para mostrar o texto dinâmico
    const typeStrings = [
      'Agendamento dos seus serviços com facilidade!',
      'Gerenciamento da sua empresa de forma digital!',
      'Check-in e controle de acesso simplificado!',
      'Fidelização de clientes com benefícios exclusivos!',
      'Uma transformação do seu negócio com um app multifuncional!',
      'Personalizamento de módulos para atender às suas necessidades!',
      'Um processo de digitalização para aumentar sua eficiência!',
      'A melhor experiência para seus clientes, na palma da mão!',
      'A Automatização do seu atendimento e otimizamos seu tempo!',
      'Uma Solução inovadora para o seu negócio crescer!'
    ];
    

    let index = 0;
    const typeInterval = setInterval(() => {
      setTypingText(typeStrings[index]);
      index = (index + 1) % typeStrings.length;
    }, 4500);

    return () => clearInterval(typeInterval); // Limpa o intervalo ao desmontar
  }, []);

  useEffect(() => {
    // Animação sincronizada de fade-in e zoom-in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Imagem com animação de fade e zoom */}
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

      {/* Texto abaixo com animação de fade */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Bem-vindo à LuckyFly!</Text>
        <Text style={styles.subtitle}>
          Nós Fornecemos <Text style={styles.typingText}>{typingText}</Text>
        </Text>

        {/* Texto "Sobre Nós" */}
        
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827', // Preto Escuro como fundo principal
  },
  panel: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#4B0082', // Roxo escuro para painel sutilmente destacado
    alignItems: 'center',
    elevation: 5, // Sombra para destacar o painel
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100, // Torna a View circular
    overflow: 'hidden', // Garante que a imagem siga o formato
    borderColor: '#00CC6A', // Verde Escuro Neon destacando a imagem
    borderWidth: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Funciona no React Native 0.71+
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00CC6A', // Verde Escuro Neon para dar destaque aos títulos
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#51B2D4', // Azul Ciano para subtítulos
    backgroundColor: 'transparent',
  },
  typingText: {
    color: '#00CC6A', // Verde Escuro Neon para texto dinâmico
    fontWeight: 'bold',
    fontSize: 36,
  },
});
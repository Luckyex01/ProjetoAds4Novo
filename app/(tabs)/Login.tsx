import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Animated,
  Platform
} from 'react-native';
import { TextInput, Button, Text, Snackbar, HelperText } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const API_URL = 'http://10.0.2.2:3000';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  RegistroUser: undefined;
};

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  // Valor animado para a escala da logo
  const logoScale = useRef(new Animated.Value(1)).current;
  
  // Efeito bounce na logo para ambiente web
  const handleLogoHoverIn = () => {
    Animated.spring(logoScale, {
      toValue: 1.2,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };
  
  const handleLogoHoverOut = () => {
    Animated.spring(logoScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };
  
  // Verifica se o usuário já está logado
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userType = await AsyncStorage.getItem('userType');
        if (userType) {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      }
    };
    checkUser();
  }, []);
  
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/usuarios/login`, { email, senha });
      if (response.status === 200) {
        const { id, email: userEmail, tipoUsuario } = response.data.usuario;
        await AsyncStorage.setItem('userId', id.toString());
        await AsyncStorage.setItem('userEmail', userEmail);
        await AsyncStorage.setItem('userType', tipoUsuario.toString());
        setVisibleSnackbar(true);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }, 1000);
      } else {
        Alert.alert('Erro', response.data.error || 'E-mail ou senha inválidos!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Falha ao conectar ao servidor. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.gradientBackground}>
      <View style={styles.container}>
        {/* Header animado com logo e marca */}
        <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
          <Pressable
            {...(Platform.OS === 'web'
              ? { onMouseEnter: handleLogoHoverIn, onMouseLeave: handleLogoHoverOut }
              : {})}
          >
            <Animated.View style={[styles.imageWrapper, { transform: [{ scale: logoScale }] }]}>
              <Image source={require('../../assets/images/logoLuckyFly.png')} style={styles.image} />
            </Animated.View>
          </Pressable>
          <Text style={styles.brand}>LuckyApps</Text>
        </Animatable.View>
  
        {/* Título e Subtítulo */}
        <Animatable.Text animation="fadeInUp" delay={200} style={styles.title}>
          Login
        </Animatable.Text>
        <Animatable.Text animation="fadeInUp" delay={300} style={styles.subtitle}>
          Bem-vindo de volta! Insira suas credenciais para acessar o futuro dos serviços.
        </Animatable.Text>
  
        {/* Card do formulário com gradiente neon na borda */}
        <View style={styles.formWrapper}>
          <LinearGradient colors={['#00CC6A', '#4B0082']} style={styles.formGradient}>
            <View style={styles.formContainer}>
              <TextInput
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                left={<TextInput.Icon icon="email" />}
                mode="outlined"
                style={styles.input}
                outlineColor="#00CC6A"
                activeOutlineColor="#00CC6A"
              />
              <TextInput
                label="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" />}
                right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(prev => !prev)} />}
                mode="outlined"
                style={styles.input}
                outlineColor="#00CC6A"
                activeOutlineColor="#00CC6A"
              />
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Entrar
              </Button>
              <Snackbar
                visible={visibleSnackbar}
                onDismiss={() => setVisibleSnackbar(false)}
                duration={Snackbar.DURATION_SHORT}
              >
                Login bem-sucedido!
              </Snackbar>
              <Pressable onPress={() => navigation.navigate('RegistroUser')}>
                <Text style={styles.link}>Criar uma conta</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}
  
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00CC6A',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  formWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  formGradient: {
    padding: 3,
    borderRadius: 20,
  },
  formContainer: {
    backgroundColor: '#ffffffcc',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#00CC6A',
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#00CC6A',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
  
export default LoginScreen;
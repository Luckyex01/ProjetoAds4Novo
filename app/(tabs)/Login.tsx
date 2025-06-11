import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Animated,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Snackbar,
} from 'react-native-paper';
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
  
  // Estado para o modal "Esqueceu a senha"
  const [forgotModalVisible, setForgotModalVisible] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const logoScale = useRef(new Animated.Value(1)).current;

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <View style={styles.container}>
            <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
              <Pressable
                {...(Platform.OS === 'web'
                  ? { onMouseEnter: handleLogoHoverIn, onMouseLeave: handleLogoHoverOut }
                  : {})}
              >
                <Animated.View style={[styles.imageWrapper, { transform: [{ scale: logoScale }] }]}>
                  <Image
                    source={require('../../assets/images/logoLuckyFly.png')}
                    style={styles.image}
                  />
                </Animated.View>
              </Pressable>
              <Text style={styles.brand}>LuckyApps</Text>
            </Animatable.View>

            <Animatable.Text animation="fadeInUp" delay={200} style={styles.title}>
              Login
            </Animatable.Text>
            <Animatable.Text animation="fadeInUp" delay={300} style={styles.subtitle}>
              Bem-vindo de volta! Insira suas credenciais para acessar o futuro dos serviços.
            </Animatable.Text>

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
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(prev => !prev)}
                      />
                    }
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#00CC6A"
                    activeOutlineColor="#00CC6A"
                  />
                  
                  {/* Link para "Esqueceu a senha?" */}
                  <Pressable onPress={() => setForgotModalVisible(true)}>
                    <Text style={styles.forgotLink}>Esqueceu a senha?</Text>
                  </Pressable>

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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Modal para recuperação de senha */}
      <Modal visible={forgotModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Text style={styles.modalTitle}>Recuperar Senha</Text>
              <Text style={styles.modalText}>
                Para recuperar sua senha, envie um e-mail para suporte@luckyapps.com
                informando seu e-mail cadastrado e seguiremos com o processo de recuperação.
              </Text>
            </ScrollView>
            <Button mode="contained" onPress={() => setForgotModalVisible(false)} style={styles.modalCloseButton}>
              Fechar
            </Button>
          </View>
        </View>
      </Modal>
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
    textDecorationLine: 'underline',
  },
  forgotLink: {
    marginTop: 10,
    textAlign: 'right',
    color: '#00CC6A',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent:'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalScroll: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 22,
    textAlign: 'justify',
  },
  modalCloseButton: {
    backgroundColor: '#00CC6A',
    marginTop: 10,
    borderRadius: 8,
  },
});

export default LoginScreen;

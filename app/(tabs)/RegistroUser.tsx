import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Pressable,
  Animated,
  Platform
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Snackbar,
  HelperText
} from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const API_URL = 'http://10.0.2.2:3000';

type RootStackParamList = {
  Login: undefined;
};

export default function RegistroUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const logoScale = useRef(new Animated.Value(1)).current;

  const handleLogoPressIn = () => {
    Animated.spring(logoScale, {
      toValue: 1.2,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handleLogoPressOut = () => {
    Animated.spring(logoScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const isPasswordStrong = (pass: string) => {
    return /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[@$!%*?&]/.test(pass) && pass.length >= 8;
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    if (!isPasswordStrong(password)) {
      Alert.alert(
        'Senha Fraca',
        'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.'
      );
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/usuario/inserir`, {
        nome: name,
        email,
        senha: password,
        tipoUsuario: 1,
      });
      if (response.status === 201) {
        setVisibleSnackbar(true);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }, 1000);
      } else {
        Alert.alert('Erro', response.data.error || 'Não foi possível criar a conta.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Falha ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#111827', '#1f2937']} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
          <Pressable
            onPressIn={handleLogoPressIn}
            onPressOut={handleLogoPressOut}
          >
            <Animated.View style={[styles.imageWrapper, { transform: [{ scale: logoScale }] }]}>
              <Image source={require('../../assets/images/logoLuckyFly.png')} style={styles.image} />
            </Animated.View>
          </Pressable>
          <Text style={styles.brand}>LuckyApps</Text>
        </Animatable.View>

        <Animatable.Text animation="fadeInUp" delay={200} style={styles.title}>
          Criar Conta
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={400} style={styles.formWrapper}>
          <LinearGradient colors={['#00CC6A', '#4B0082']} style={styles.formGradient}>
            <View style={styles.formContainer}>
              <TextInput
                label="Nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                left={<TextInput.Icon icon="account" />}
                mode="outlined"
                style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
                outlineColor="#00CC6A"
                activeOutlineColor="#00CC6A"
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />

              <TextInput
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
                mode="outlined"
                style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
                outlineColor="#00CC6A"
                activeOutlineColor="#00CC6A"
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />

              <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" />}
                right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(prev => !prev)} />}
                mode="outlined"
                style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
                outlineColor="#00CC6A"
                activeOutlineColor="#00CC6A"
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />

              <HelperText type={isPasswordStrong(password) ? 'info' : 'error'} visible={password.length > 0}>
                A senha deve conter 8+ caracteres, uma letra maiúscula, um número e um símbolo.
              </HelperText>

              <Button
                mode="contained"
                onPress={handleRegister}
                loading={loading}
                disabled={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                Cadastrar
              </Button>

              <Snackbar
                visible={visibleSnackbar}
                onDismiss={() => setVisibleSnackbar(false)}
                duration={Snackbar.DURATION_SHORT}
              >
                Conta criada com sucesso!
              </Snackbar>

              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Já tem uma conta? Faça login</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </Animatable.View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
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
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: '#00FF00',
    borderWidth: 2,
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
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

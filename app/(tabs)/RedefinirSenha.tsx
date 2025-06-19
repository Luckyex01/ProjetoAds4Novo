import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Animated,
} from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const API_URL = 'http://10.0.2.2:3000';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  RedefinirSenha: undefined;
};

function RedefinirSenhaScreen() {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Animação para a logo, similar à utilizada nas telas de Login e Registro
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

  const handleChangePassword = async () => {
    if (!email.trim() || !novaSenha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/usuarios/redefinir-senha`, {
        email,
        novaSenha,
        confirmarSenha,
      });

      if (response.status === 200) {
        setVisibleSnackbar(true);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }, 1500);
      } else {
        Alert.alert('Erro', response.data?.error || 'Falha ao redefinir senha.');
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      Alert.alert('Erro', 'Falha ao conectar ao servidor. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#141E30', '#243B55']} style={styles.gradientBackground}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <View style={styles.container}>
            {/* Cabeçalho animado: Logo e Branding */}
            <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
              <Pressable
                {...(Platform.OS === 'web'
                  ? { onMouseEnter: handleLogoHoverIn, onMouseLeave: handleLogoHoverOut }
                  : {})}
              >
                <Animated.View style={[styles.imageWrapper, { transform: [{ scale: logoScale }] }]}>
                  {/* Caminho atualizado para sua logo */}
                  <Image
                    source={require('../../assets/images/logoLuckyFly.png')}
                    style={styles.image}
                  />
                </Animated.View>
              </Pressable>
              <Text style={styles.brand}>LuckyApps</Text>
            </Animatable.View>

            <Animatable.Text animation="fadeInUp" delay={200} style={styles.title}>
              Redefinir Senha
            </Animatable.Text>

            <Animatable.View animation="fadeInUp" delay={300} style={styles.formWrapper}>
              <LinearGradient colors={['#00CC6A', '#4B0082']} style={styles.formGradient}>
                <View style={styles.formContainer}>
                  <TextInput
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    mode="outlined"
                    left={<TextInput.Icon icon="email" />}
                    outlineColor="#00CC6A"
                    activeOutlineColor="#00CC6A"
                    theme={{ colors: { text: '#FFFFFF' } }}
                  />
                  <TextInput
                    label="Nova Senha"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry
                    style={styles.input}
                    mode="outlined"
                    left={<TextInput.Icon icon="lock" />}
                    right={
                      <TextInput.Icon
                        icon="eye"
                        onPress={() => {}}
                        // Você pode implementar o toggle de visibilidade se necessário.
                      />
                    }
                    outlineColor="#00CC6A"
                    activeOutlineColor="#00CC6A"
                    theme={{ colors: { text: '#FFFFFF' } }}
                  />
                  <TextInput
                    label="Confirmar Nova Senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry
                    style={styles.input}
                    mode="outlined"
                    left={<TextInput.Icon icon="lock" />}
                    right={
                      <TextInput.Icon
                        icon="eye"
                        onPress={() => {}}
                        // Implementar toggle de visibilidade, se desejado.
                      />
                    }
                    outlineColor="#00CC6A"
                    activeOutlineColor="#00CC6A"
                    theme={{ colors: { text: '#FFFFFF' } }}
                  />

                  <Button
                    mode="contained"
                    onPress={handleChangePassword}
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    loading={loading}
                    disabled={loading}
                  >
                    Redefinir Senha
                  </Button>
                  <Snackbar
                    visible={visibleSnackbar}
                    onDismiss={() => setVisibleSnackbar(false)}
                    duration={3000}
                    style={styles.snackbar}
                  >
                    Senha redefinida com sucesso!
                  </Snackbar>
                </View>
              </LinearGradient>
            </Animatable.View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#111827',
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
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#00CC6A',
  },
});

export default RedefinirSenhaScreen;

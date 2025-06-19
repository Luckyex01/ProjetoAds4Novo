import React, { useState, useRef, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const API_URL = 'http://10.0.2.2:3000';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  AlterarSenha: undefined;
};

export default function AlterarSenhaScreen() {
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Animação da logo
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

  // Função que realiza a alteração de senha
  const handleChangePassword = async () => {
    if (!email.trim() || !senhaAtual.trim() || !novaSenha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/usuarios/alterar-senha`, {
        email,
        senhaAtual,
        novaSenha,
      });
      if (response.status === 200) {
        setVisibleSnackbar(true);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }, 1500);
      } else {
        Alert.alert('Erro', response.data?.error || 'Erro ao alterar a senha.');
      }
    } catch (error) {
      console.error('Erro ao alterar a senha:', error);
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
            {/* Cabeçalho animado: logo e branding "LuckyApps" */}
            <Animatable.View animation="fadeInDown" duration={800} style={styles.header}>
              <Pressable
                {...(Platform.OS === 'web'
                  ? { onMouseEnter: handleLogoHoverIn, onMouseLeave: handleLogoHoverOut }
                  : {})}
              >
                <Animated.View style={[styles.imageWrapper, { transform: [{ scale: logoScale }] }]}>
                  <Image source={require("../../assets/images/logoLuckyFly.png")} style={styles.image} />
                </Animated.View>
              </Pressable>
              <Text style={styles.brand}>LuckyApps</Text>
            </Animatable.View>

            <Animatable.Text animation="fadeInUp" delay={200} style={styles.title}>
              Alterar Senha
            </Animatable.Text>

            {/* Formulário: inputs com modo "outlined" e tema escuro */}
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
                    label="Senha Atual"
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                    secureTextEntry={!showSenhaAtual}
                    style={styles.input}
                    mode="outlined"
                    left={<TextInput.Icon icon="lock" />}
                    right={
                      <TextInput.Icon
                        icon={showSenhaAtual ? 'eye-off' : 'eye'}
                        onPress={() => setShowSenhaAtual((prev) => !prev)}
                      />
                    }
                    outlineColor="#00CC6A"
                    activeOutlineColor="#00CC6A"
                    theme={{ colors: { text: '#FFFFFF' } }}
                  />
                  <TextInput
                    label="Nova Senha"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry={!showNovaSenha}
                    style={styles.input}
                    mode="outlined"
                    left={<TextInput.Icon icon="lock" />}
                    right={
                      <TextInput.Icon
                        icon={showNovaSenha ? 'eye-off' : 'eye'}
                        onPress={() => setShowNovaSenha((prev) => !prev)}
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
                    Alterar Senha
                  </Button>
                  <Snackbar
                    visible={visibleSnackbar}
                    onDismiss={() => setVisibleSnackbar(false)}
                    duration={3000}
                    style={styles.snackbar}
                  >
                    Senha alterada com sucesso!
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


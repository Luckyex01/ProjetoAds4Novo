import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRouter } from 'expo-router';

const API_URL = 'http://10.0.2.2:3000';

// Tipagem correta para evitar erro do TypeScript
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const router = useRouter();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userType = await AsyncStorage.getItem('userType');
        if (userType) {
          navigation.replace('Home'); // Redireciona se já estiver logado
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
      const response = await axios.post(`${API_URL}/usuarios/login`, {
        email,
        senha,
      });

      if (response.status === 200) {
        const { id, email: userEmail, tipoUsuario } = response.data.usuario;

        await AsyncStorage.setItem('userId', id.toString());
        await AsyncStorage.setItem('userEmail', userEmail);
        await AsyncStorage.setItem('userType', tipoUsuario.toString());

        console.log('userId:', await AsyncStorage.getItem('userId'));
        console.log('userEmail:', await AsyncStorage.getItem('userEmail'));
        console.log('userType:', await AsyncStorage.getItem('userType'));

        setVisibleSnackbar(true);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] }); // Usar reset
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageWrapper}>
          <Image source={require('../../assets/images/Elysium.png')} style={styles.image} />
        </View>
        <Text style={styles.brand}>Elysium Beauty</Text>
      </View>

      <Text style={styles.title}>Login</Text>

      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Entrar
      </Button>

      <Text style={styles.link} onPress={() => router.push('/(tabs)/CadastroAtendimento')}>
        Criar uma conta
      </Text>

      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        Login bem-sucedido!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D2B48C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#5D4037',
    fontFamily: 'serif',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#A67B5B',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#A67B5B', // verde claro no link
    fontWeight: 'bold',
  },
});



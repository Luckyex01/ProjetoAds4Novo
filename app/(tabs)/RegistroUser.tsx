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
  ScrollView,
  Modal,
} from 'react-native';
import { TextInput, Button, Text, Snackbar, Checkbox, HelperText } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const API_URL = 'http://10.0.2.2:3000';

type RootStackParamList = {
  Login: undefined;
  CadastroAtendimento: undefined;
};

export default function RegistroUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estados para os modais de Termos e Políticas
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Animação para a logo (idêntica à do Login)
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

  // Função para validar a senha forte
  const isPasswordValid = () => {
    // Exige ao menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    if (!isPasswordValid()) {
      Alert.alert('Senha Fraca', 'A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula e um número.');
      return;
    }
    if (!termsAccepted) {
      Alert.alert('Atenção', 'Você deve aceitar os Termos de Uso e a Política de Privacidade.');
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

  // Conteúdos detalhados para os modais (exemplo - modifique conforme necessário)
  const termsContent = `
Termos de Uso

1. Aceitação dos Termos
Ao criar uma conta neste aplicativo, você concorda em cumprir estes Termos de Uso, que regem o seu uso dos nossos serviços. Leia atentamente todos os itens aqui descritos.

2. Uso Permitido e Restrições
Você se compromete a utilizar o aplicativo somente para fins legítimos. É estritamente proibido utilizar o aplicativo para:
- Realizar atividades ilegais ou que violem a legislação;
- Infringir direitos de terceiros, incluindo propriedade intelectual;
- Comprometer a segurança, enviar spam ou realizar quaisquer ações maliciosas.

3. Conta e Responsabilidade
Você é responsável por manter a confidencialidade das suas credenciais e por todas as atividades realizadas na sua conta. Notifique-nos imediatamente se suspeitar do uso não autorizado da sua conta.

4. Modificações e Atualizações
Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações serão publicadas no aplicativo e entraremos em vigor imediatamente após a publicação.
  `;

  const privacyContent = `
Política de Privacidade

1. Coleta de Dados
Coletamos informações pessoais, como nome, e-mail e dados de login, para criar e gerenciar sua conta. Dados de uso e outros registros técnicos também podem ser coletados para melhorar a experiência do aplicativo.

2. Uso dos Dados
Os dados coletados são utilizados para:
- Prover e melhorar nossos serviços;
- Personalizar sua experiência;
- Enviar notificações e atualizações relevantes;
- Garantir a segurança e a conformidade com a legislação.

3. Compartilhamento e Segurança
Seus dados não são vendidos a terceiros. Podemos compartilhar suas informações com parceiros confiáveis somente para aprimorar os serviços, sempre seguindo medidas rigorosas de segurança e conformidade com a LGPD e demais leis vigentes.

4. Direitos do Usuário
Você tem direito de acessar, corrigir ou excluir seus dados pessoais. Caso deseje exercer esses direitos, entre em contato conosco por meio dos canais oficiais.

5. Alterações nesta Política
Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou em requisitos legais. Notificaremos você sobre alterações significativas.
  `;

  return (
    <LinearGradient 
      colors={['#141E30', '#243B55']} 
      style={styles.gradientBackground}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <View style={styles.container}>
            {/* Header animado */}
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
              Criar Conta
            </Animatable.Text>

            <Animatable.View animation="fadeInUp" delay={300} style={styles.formWrapper}>
              <LinearGradient colors={['#00CC6A', '#4B0082']} style={styles.formGradient}>
                <View style={styles.formContainer}>
                  <TextInput
                    label="Nome"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    style={styles.input}
                    mode="outlined"
                    left={<TextInput.Icon icon="account" />}
                    outlineColor="#00CC6A"
                    activeOutlineColor="#00CC6A"
                    theme={{ roundness: 10 }}
                  />

                  <TextInput
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    style={styles.input}
                    mode="outlined"
                    left={<TextInput.Icon icon="email" />}
                    outlineColor="#00CC6A"
                    activeOutlineColor="#00CC6A"
                    theme={{ roundness: 10 }}
                  />

                  <TextInput
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    mode="outlined"
                    left={<TextInput.Icon icon="lock" />}
                    right={
                      <TextInput.Icon 
                        icon={showPassword ? 'eye-off' : 'eye'} 
                        onPress={() => setShowPassword(prev => !prev)}
                      />
                    }
                    outlineColor="#00CC6A"
                    activeOutlineColor="#00CC6A"
                    theme={{ roundness: 10 }}
                  />

                  <HelperText type="info" visible={password.length > 0 && !isPasswordValid()}>
                    A senha deve ter pelo menos 8 caracteres, com letra maiúscula, minúscula e um número.
                  </HelperText>

                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={termsAccepted ? 'checked' : 'unchecked'}
                      onPress={() => setTermsAccepted(!termsAccepted)}
                      color="#00CC6A"
                    />
                    <Text style={styles.checkboxLabel}>
                      Li e aceito os{' '}
                      <Text style={styles.link} onPress={() => setTermsModalVisible(true)}>
                        Termos de Uso
                      </Text>{' '}
                      e{' '}
                      <Text style={styles.link} onPress={() => setPrivacyModalVisible(true)}>
                        Política de Privacidade
                      </Text>.
                    </Text>
                  </View>

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

                  <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                    Já tem uma conta? Faça login
                  </Text>
                </View>
              </LinearGradient>
            </Animatable.View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Modal para Termos de Uso */}
      <Modal visible={termsModalVisible} transparent animationType="slide">
        <View style={styles.modalOuterContainer}>
          <View style={styles.modalInnerContainer}>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Text style={styles.modalTitle}>Termos de Uso</Text>
              <Text style={styles.modalText}>
                {/* Aqui você pode inserir os parágrafos detalhados dos Termos de Uso */}
                1. Aceitação dos Termos{'\n'}
                Ao criar uma conta neste aplicativo, você concorda com estes Termos de Uso, os quais regem todas as interações com os serviços fornecidos. Leia atentamente cada cláusula e esteja ciente dos seus direitos e obrigações.
                {"\n\n"}
                2. Uso do Aplicativo{'\n'}
                O aplicativo é fornecido exclusivamente para uso pessoal e não comercial. É proibida a reprodução, modificação ou distribuição sem autorização prévia. Você concorda em utilizá-lo apenas para os fins a que se destina, comprometendo-se a não praticar nenhuma atividade ilegal ou prejudicial.
                {"\n\n"}
                3. Responsabilidades do Usuário{'\n'}
                Você é o único responsável pela utilização de sua conta. Mantenha suas credenciais em sigilo e notifique imediatamente qualquer uso não autorizado. O descumprimento destes termos pode resultar na suspensão ou cancelamento da sua conta.
                {"\n\n"}
                4. Alterações nos Termos de Uso{'\n'}
                Reservamo-nos o direito de alterar estes termos a qualquer momento, sem aviso prévio, sendo sua responsabilidade acompanhar as atualizações.
              </Text>
            </ScrollView>
            <Button
              mode="contained"
              onPress={() => setTermsModalVisible(false)}
              style={styles.modalCloseButton}
            >
              Fechar
            </Button>
          </View>
        </View>
      </Modal>

      {/* Modal para Política de Privacidade */}
      <Modal visible={privacyModalVisible} transparent animationType="slide">
        <View style={styles.modalOuterContainer}>
          <View style={styles.modalInnerContainer}>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Text style={styles.modalTitle}>Política de Privacidade</Text>
              <Text style={styles.modalText}>
                {/* Insira os parágrafos detalhados da Política de Privacidade */}
                1. Coleta de Dados{'\n'}
                Nós coletamos informações pessoais, como nome, e-mail e outros dados relevantes, para oferecer e melhorar nossos serviços. Esses dados são coletados somente com o seu consentimento e para finalidades específicas.
                {"\n\n"}
                2. Uso dos Dados{'\n'}
                Seus dados são usados para criar sua conta, personalizar sua experiência, enviar notificações e melhorar os nossos serviços. Não compartilhamos suas informações com terceiros sem sua autorização, exceto quando exigido por lei.
                {"\n\n"}
                3. Segurança e Armazenamento{'\n'}
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Seus dados são armazenados de forma segura e serão mantidos apenas pelo tempo necessário para cumprir a finalidade para a qual foram coletados.
                {"\n\n"}
                4. Direitos do Usuário{'\n'}
                Você tem o direito de acessar, corrigir e excluir seus dados pessoais. Para exercer esses direitos, entre em contato conosco por meio dos canais disponíveis no aplicativo.
              </Text>
            </ScrollView>
            <Button
              mode="contained"
              onPress={() => setPrivacyModalVisible(false)}
              style={styles.modalCloseButton}
            >
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
    justifyContent: 'center',
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'center',
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
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
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#00CC6A',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#555',
    flexShrink: 1,
  },
  modalOuterContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalInnerContainer: {
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
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    lineHeight: 22,
    textAlign: 'left',
  },
    modalCloseButton: {
      marginTop: 16,
      backgroundColor: '#00CC6A',
      borderRadius: 8,
    },
  });

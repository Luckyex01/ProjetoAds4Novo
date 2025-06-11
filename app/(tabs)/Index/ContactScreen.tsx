import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const GRADIENT_COLORS = ["#00CC6A", "#4B0082"];

const ContactScreen = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [focusedInput, setFocusedInput] = useState<null | "nome" | "email" | "assunto" | "mensagem">(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const formRef = useRef<Animatable.View & { shake?: (duration?: number) => void }>(null);

  // Animação de interpolação de cor para o título
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const colorInterpolation = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [GRADIENT_COLORS[0], GRADIENT_COLORS[1]],
  });

  // Animação de escala para o botão
  const [buttonScale] = useState(new Animated.Value(1));
  const onPressInButton = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const onPressOutButton = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleSend = () => {
    if (!nome || !email || !assunto || !mensagem) {
      if (formRef.current) {
        formRef.current?.shake?.(800);
      }
      alert("Preencha todos os campos!");
      return;
    }
    alert("Mensagem enviada! Obrigado pelo contato.");
    // Limpa os campos se necessário
    setNome("");
    setEmail("");
    setAssunto("");
    setMensagem("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Título animado */}
      <Animated.Text style={[styles.logoText, { color: colorInterpolation }]}>
        LuckyApps
      </Animated.Text>

      {/* Logo redonda e tagline */}
      <Animatable.View animation="fadeInUp" delay={100} style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logoLuckyFly.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animatable.Text animation="fadeIn" delay={200} style={styles.tagline}>
          Conectando você ao futuro
        </Animatable.Text>
      </Animatable.View>

      {/* Seção: Telefones */}
      <Animatable.View animation="fadeInUp" delay={300} style={styles.section}>
        <View style={styles.row}>
          <Animatable.View animation="pulse" iterationCount="infinite" style={styles.iconContainer}>
            <Icon name="phone" size={20} color="#51B2D4" />
          </Animatable.View>
          <Text style={styles.label}> Telefones:</Text>
        </View>
        <Text style={styles.text}>+123-456-789</Text>
        <Text style={styles.text}>+111-222-333</Text>
      </Animatable.View>

      <View style={styles.separator} />

      {/* Seção: Emails */}
      <Animatable.View animation="fadeInUp" delay={350} style={styles.section}>
        <View style={styles.row}>
          <Animatable.View animation="pulse" iterationCount="infinite" style={styles.iconContainer}>
            <Icon name="email-outline" size={20} color="#51B2D4" />
          </Animatable.View>
          <Text style={styles.label}> Emails:</Text>
        </View>
        <Text style={styles.text}>info@luckyapps.com</Text>
        <Text style={styles.text}>support@luckyapps.com</Text>
      </Animatable.View>

      <View style={styles.separator} />

      {/* Seção: Instagram */}
      <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
        <View style={styles.row}>
          <Animatable.View animation="pulse" iterationCount="infinite" style={styles.iconContainer}>
            <Icon name="instagram" size={20} color="#51B2D4" />
          </Animatable.View>
          <Text style={styles.label}> Instagram:</Text>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/luckyapps")}>
          <Text style={styles.link}>@luckyapps</Text>
        </TouchableOpacity>
      </Animatable.View>

      <View style={styles.separator} />

      {/* Seção: Facebook */}
      <Animatable.View animation="fadeInUp" delay={450} style={styles.section}>
        <View style={styles.row}>
          <Animatable.View animation="pulse" iterationCount="infinite" style={styles.iconContainer}>
            <Icon name="facebook" size={20} color="#51B2D4" />
          </Animatable.View>
          <Text style={styles.label}> Facebook:</Text>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/luckyapps")}>
          <Text style={styles.link}>/luckyapps</Text>
        </TouchableOpacity>
      </Animatable.View>

      <View style={styles.separator} />

      {/* Formulário */}
      <Animatable.View animation="fadeInUp" delay={500} ref={formRef}>
        <TextInput
          style={[styles.input, focusedInput === "nome" && styles.inputFocused]}
          placeholder="Nome"
          placeholderTextColor="#999"
          onFocus={() => setFocusedInput("nome")}
          onBlur={() => setFocusedInput(null)}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={[styles.input, focusedInput === "email" && styles.inputFocused]}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#999"
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput(null)}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, focusedInput === "assunto" && styles.inputFocused]}
          placeholder="Assunto"
          placeholderTextColor="#999"
          onFocus={() => setFocusedInput("assunto")}
          onBlur={() => setFocusedInput(null)}
          value={assunto}
          onChangeText={setAssunto}
        />
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            focusedInput === "mensagem" && styles.inputFocused,
          ]}
          placeholder="Mensagem"
          multiline
          placeholderTextColor="#999"
          onFocus={() => setFocusedInput("mensagem")}
          onBlur={() => setFocusedInput(null)}
          textAlignVertical="top"
          value={mensagem}
          onChangeText={setMensagem}
        />
      </Animatable.View>

      {/* Botão de envio com animação de scale e ícone */}
      <Animatable.View animation="fadeInUp" delay={600}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Pressable
            onPressIn={onPressInButton}
            onPressOut={onPressOutButton}
            onPress={handleSend}
            style={({ pressed }) => [
              styles.button,
              pressed && { backgroundColor: "#4B0082" },
            ]}
          >
            <View style={styles.buttonContent}>
              <Icon name="send" size={20} color="#111827" />
              <Text style={styles.buttonText}> Enviar mensagem</Text>
            </View>
          </Pressable>
        </Animated.View>
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 20,
  },
  logoText: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "System",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  tagline: {
    color: "#9CA3AF",
    fontSize: 16,
    marginTop: 8,
  },
  section: {
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconContainer: {
    marginRight: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#51B2D4",
  },
  text: {
    fontSize: 16,
    color: "#E5E7EB",
    marginBottom: 3,
    marginLeft: 25,
  },
  link: {
    fontSize: 16,
    color: "#4B0082",
    textDecorationLine: "underline",
    marginLeft: 25,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4B0082",
    backgroundColor: "#1F2937",
    color: "#E5E7EB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#00CC6A",
    shadowColor: "#00CC6A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: "#00CC6A",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#00CC6A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#111827",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 6,
  },
});

export default ContactScreen;

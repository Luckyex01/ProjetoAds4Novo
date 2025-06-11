import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from './Login';
import AlterarSenhaScreen from './AlterarSenha';
import RedefinirSenhaScreen from './RedefinirSenha';
import RegistroUserScreen from './RegistroUser';
import CadastroAtendimento from './CadastroAtendimento';
import GerenciamentoUser from '../GerenciamentoUser';
import GerenciamentoAgendamento from '../GerenciamentoAgendamento';
import GerenciamentoServico from '../GerenciamentoServico';
import Relatorio from '../Relatorio';
// Telas
import HomeScreen from './index';
import AboutScreen from './Index/AboutScreen';
import ServiceScreen from './Index/ServiceScreen';
import PortfolioScreen from './Index/PortfolioScreen';
import TestimonialScreen from './Index/TestimonialScreen';
import BlogScreen from './Index/BlogScreen';
import ContactScreen from './Index/ContactScreen';
import { RouteProp } from '@react-navigation/native';

// Criando os navegadores
const DrawerNavigator = createDrawerNavigator();
const TabNavigator = createBottomTabNavigator();

type IconName =
  | 'home'
  | 'information'
  | 'construct'
  | 'briefcase'
  | 'people'
  | 'file-tray'
  | 'call';

// Função para configurar as Tabs com as cores e estilo atualizados
function Tabs() {
  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({ route }: { route: RouteProp<any, any> }) => ({
        tabBarActiveTintColor: "#00CC6A", // Item ativo: Neon verde
        tabBarInactiveTintColor: "#FFFFFF", // Inativo: Branco
        tabBarStyle: { backgroundColor: "#141E30" }, // Fundo escuro
        headerStyle: { backgroundColor: "#141E30" },
        headerTintColor: "#FFFFFF",
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: IconName;
          switch (route.name) {
            case 'Sobre nos':
              iconName = 'information';
              break;
            case 'Serviços':
              iconName = 'construct';
              break;
            case 'Portfolio':
              iconName = 'briefcase';
              break;
            case 'Home':
              iconName = 'home';
              break;
            case 'Depoimentos':
              iconName = 'people';
              break;
            case 'Noticias sobre nossos serviços':
              iconName = 'file-tray';
              break;
            case 'Contato':
              iconName = 'call';
              break;
            default:
              iconName = 'home';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* A ordem dos screens foi alterada para que "Home" apareça no meio */}
      <TabNavigator.Screen name="Sobre nos" component={AboutScreen} />
      <TabNavigator.Screen name="Serviços" component={ServiceScreen} />
      <TabNavigator.Screen name="Portfolio" component={PortfolioScreen} />
      <TabNavigator.Screen name="Home" component={HomeScreen} />
      <TabNavigator.Screen name="Depoimentos" component={TestimonialScreen} />
      <TabNavigator.Screen name="Noticias sobre nossos serviços" component={BlogScreen} />
      <TabNavigator.Screen name="Contato" component={ContactScreen} />
    </TabNavigator.Navigator>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const [userType, setUserType] = useState<string | null>(null); // Estado do tipo de usuário
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  // Obtém o tipo de usuário do AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('userType')
      .then((userTypeStored) => {
        console.log('userTypeStored:', userTypeStored);
        setUserType(userTypeStored);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao obter userType:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null; // Aqui você pode renderizar um spinner se desejar
  }

  // Função para realizar o logout: limpa os dados armazenados e atualiza o estado
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userType');
    setUserType(null);
  };

  return (
    <DrawerNavigator.Navigator
      screenOptions={({ navigation }) => ({
        drawerActiveTintColor: "#00CC6A",
        drawerInactiveTintColor: "#FFFFFF",
        drawerStyle: {
          backgroundColor: "#141E30",
        },
        headerStyle: { backgroundColor: "#141E30" },
        headerTintColor: "#FFFFFF",
        headerLeft: () => (
          <Pressable
            onPress={() => {
              AsyncStorage.getItem('userType')
                .then((userTypeStored) => {
                  console.log('userTypeStored:', userTypeStored);
                  setUserType(userTypeStored);
                  setLoading(false);
                  navigation.toggleDrawer();
                })
                .catch((error) => {
                  console.error('Erro ao obter userType:', error);
                  setLoading(false);
                });
            }}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color="#00CC6A" />
          </Pressable>
        ),
      })}
    >
      <DrawerNavigator.Screen
        name="Home"
        options={{
          title: 'Inicio',
          drawerIcon: ({ color }: { color: string }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
        component={Tabs}
      />

      {userType !== '0' && userType !== '1' && (
        <>
          <DrawerNavigator.Screen
            name="Login"
            options={{
              title: 'Login',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="log-in-outline" size={28} color={color} />
              ),
            }}
            component={LoginScreen}
          />
          <DrawerNavigator.Screen
            name="RegistroUser"
            options={{
              title: 'Cadastro de Usuário',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="person-add-outline" size={28} color={color} />
              ),
            }}
            component={RegistroUserScreen}
          />
        </>
      )}

      {userType === '0' && (
        <>
          <DrawerNavigator.Screen
            name="GerenciamentoUser"
            options={{
              title: 'Gerenciamento de Usuarios',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="people" size={28} color={color} />
              ),
            }}
            component={GerenciamentoUser}
          />
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamento"
            options={{
              title: 'Gerenciamento de Agendamento',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="calendar-outline" size={28} color={color} />
              ),
            }}
            component={GerenciamentoAgendamento}
          />
          <DrawerNavigator.Screen
            name="GerenciamentoServico"
            options={{
              title: 'Gerenciamento de Serviço',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="construct-outline" size={28} color={color} />
              ),
            }}
            component={GerenciamentoServico}
          />
          <DrawerNavigator.Screen
            name="Reletorio"
            options={{
              title: 'Relatorio',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="construct-outline" size={28} color={color} />
              ),
            }}
            component={Relatorio}
          />
          <DrawerNavigator.Screen
            name="AlterarSenha"
            options={{
              title: 'Alterar Senha',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="key-outline" size={28} color={color} />
              ),
            }}
            component={AlterarSenhaScreen}
          />
          <DrawerNavigator.Screen
            name="RedefinirSenha"
            options={{
              title: 'Redefinir Senha',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="lock-open-outline" size={28} color={color} />
              ),
            }}
            component={RedefinirSenhaScreen}
          />
          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="log-out-outline" size={28} color={color} />
              ),
            }}
            listeners={{
              focus: () => {
                console.log('userType:', userType);
                handleLogout();
              },
            }}
            component={() => null}
          />
        </>
      )}

      {userType === '1' && (
        <>
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamento"
            options={{
              title: 'Gerenciamento de Agendamento',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="calendar-outline" size={28} color={color} />
              ),
            }}
            component={GerenciamentoAgendamento}
          />
          <DrawerNavigator.Screen
            name="CadastroAtendimento"
            options={{
              title: 'Cadastro do Atendimento',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="person-add-outline" size={28} color={color} />
              ),
            }}
            component={CadastroAtendimento}
          />
          <DrawerNavigator.Screen
            name="AlterarSenha"
            options={{
              title: 'Alterar Senha',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="key-outline" size={28} color={color} />
              ),
            }}
            component={AlterarSenhaScreen}
          />
          <DrawerNavigator.Screen
            name="RedefinirSenha"
            options={{
              title: 'Redefinir Senha',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="lock-open-outline" size={28} color={color} />
              ),
            }}
            component={RedefinirSenhaScreen}
          />
          <DrawerNavigator.Screen
            name="Sair"
            options={{
              title: 'Sair',
              drawerIcon: ({ color }: { color: string }) => (
                <Ionicons name="log-out-outline" size={28} color={color} />
              ),
            }}
            listeners={{
              focus: () => {
                console.log('userType:', userType);
                handleLogout();
              },
            }}
            component={() => null}
          />
        </>
      )}
    </DrawerNavigator.Navigator>
  );
}

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {
  Button as PaperButton,
  Menu,
  Provider,
  TextInput,
  Snackbar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

const Relatorio = () => {
  // Estados dos filtros para cada coluna
  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');
  const [campo3, setCampo3] = useState('');
  // Estados dos valores dos filtros
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [valor3, setValor3] = useState('');
  // Estado para a lista de agendamentos e feedback
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  // Estados para os menus de seleção das colunas
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  // Opções de colunas para filtragem
  const options = [
    'Data do Agendamento',
    'Horário do Atendimento',
    'Tipo do Serviço',
    'Valor do Serviço',
    'Nome do Cliente',
    'Email do Cliente',
    'Telefone do Cliente',
  ];

  // Função para realizar o filtro (envia os filtros via POST)
  const handleFiltrar = async () => {
    console.log(campo1, campo2, campo3, valor1, valor2, valor3);
    try {
      // Utilizamos POST pois GET não permite enviar body
      const response = await axios.post(`${API_URL}/Relatorio/GetAgendamentos`, {
        campo1,
        campo2,
        campo3,
        valor1,
        valor2,
        valor3,
      });
      const data = response.data;
      setAgendamentos(data);
      setSnackbarMsg(`Foram encontrados ${data.length} agendamentos.`);
      setSnackbarVisible(true);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      Alert.alert('Erro', 'Erro ao buscar agendamentos.');
    }
  };

  // Função para limpar os filtros e a lista de resultados
  const handleClearFilters = () => {
    setCampo1('');
    setCampo2('');
    setCampo3('');
    setValor1('');
    setValor2('');
    setValor3('');
    setAgendamentos([]);
  };

  // Renderiza cada item da lista
  const renderAgendamento = ({ item }: { item: any }) => (
    <View style={styles.agendamentoItem}>
      <Text style={styles.agendamentoText}>{JSON.stringify(item)}</Text>
    </View>
  );

  // Cabeçalho (ListHeaderComponent) que contém a logo, filtros e botões
  const ListHeader = () => (
    <View style={styles.headerContainer}>
      {/* Cabeçalho com logo e marca */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logoLuckyFly.png')}
          style={styles.image}
        />
        <Text style={styles.name}>LuckyApps</Text>
      </View>
      <Text style={styles.title}>Relatório</Text>

      {/* Grupo de filtros */}
      <View style={styles.filtersContainer}>
        {/* Filtro para Coluna 1 */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterText}>Escolha a coluna 1:</Text>
          <Menu
            visible={visible1}
            onDismiss={() => setVisible1(false)}
            anchor={
              <PaperButton
                mode="contained"
                onPress={() => setVisible1(true)}
                style={styles.menuButton}
              >
                {campo1 || 'Escolha uma coluna'}
              </PaperButton>
            }
          >
            {options.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setCampo1(option);
                  setVisible1(false);
                }}
                title={option}
              />
            ))}
          </Menu>
          <Text style={styles.filterText}>Filtro 1:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o filtro"
            placeholderTextColor="#9CA3AF"
            value={valor1}
            onChangeText={setValor1}
          />
        </View>

        {/* Filtro para Coluna 2 */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterText}>Escolha a coluna 2:</Text>
          <Menu
            visible={visible2}
            onDismiss={() => setVisible2(false)}
            anchor={
              <PaperButton
                mode="contained"
                onPress={() => setVisible2(true)}
                style={styles.menuButton}
              >
                {campo2 || 'Escolha uma coluna'}
              </PaperButton>
            }
          >
            {options.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setCampo2(option);
                  setVisible2(false);
                }}
                title={option}
              />
            ))}
          </Menu>
          <Text style={styles.filterText}>Filtro 2:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o filtro"
            placeholderTextColor="#9CA3AF"
            value={valor2}
            onChangeText={setValor2}
          />
        </View>

        {/* Filtro para Coluna 3 */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterText}>Escolha a coluna 3:</Text>
          <Menu
            visible={visible3}
            onDismiss={() => setVisible3(false)}
            anchor={
              <PaperButton
                mode="contained"
                onPress={() => setVisible3(true)}
                style={styles.menuButton}
              >
                {campo3 || 'Escolha uma coluna'}
              </PaperButton>
            }
          >
            {options.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setCampo3(option);
                  setVisible3(false);
                }}
                title={option}
              />
            ))}
          </Menu>
          <Text style={styles.filterText}>Filtro 3:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o filtro"
            placeholderTextColor="#9CA3AF"
            value={valor3}
            onChangeText={setValor3}
          />
        </View>

        {/* Botões de ação */}
        <PaperButton
          mode="contained"
          onPress={handleFiltrar}
          style={styles.searchButton}
        >
          Pesquisar
        </PaperButton>
        <PaperButton
          mode="outlined"
          onPress={handleClearFilters}
          style={styles.clearButton}
        >
          Limpar Filtros
        </PaperButton>
      </View>
    </View>
  );

  return (
    <Provider>
      <LinearGradient colors={['#141E30', '#243B55']} style={styles.gradientBackground}>
        <FlatList
          data={agendamentos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderAgendamento}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
          }
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={styles.snackbar}
        >
          {snackbarMsg}
        </Snackbar>
      </LinearGradient>
    </Provider>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#111827',
  },
  headerContainer: {
    marginBottom: 20,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00CC6A',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginBottom: 20,
    textAlign: 'center',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterText: {
    fontSize: 18,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderColor: '#374151',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: '#FFFFFF',
  },
  menuButton: {
    backgroundColor: '#00A06A',
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: '#00A06A',
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearButton: {
    borderColor: '#00CC6A',
    borderWidth: 1,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  agendamentoItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    marginBottom: 12,
  },
  agendamentoText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  emptyText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  snackbar: {
    backgroundColor: '#00CC6A',
  },
});

export default Relatorio;

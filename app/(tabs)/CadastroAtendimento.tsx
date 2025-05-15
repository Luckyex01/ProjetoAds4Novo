import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import axios from 'axios'; // Importando apenas o Axios

const API_URL = 'http://10.0.2.2:3000'; // Use o IP da sua máquina

export default function RegisterScreen() {
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [dthoraAgendamento, setDthoraAgendamento] = useState('');
  const [horario, setHorario] = useState('');
  const [fkUsuarioId, setFkUsuarioId] = useState('');
  const [fkServicoId, setFkServicoId] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Verificando se todos os campos foram preenchidos
      if (!dataAtendimento || !dthoraAgendamento || !horario || !fkUsuarioId || !fkServicoId) {
        Alert.alert('Erro', 'Todos os campos são obrigatórios.');
        return;
      }
  
      // Formatando as datas para o padrão ISO 8601
      const formattedDataAtendimento = new Date(dataAtendimento).toISOString();
      const formattedDthoraAgendamento = new Date(dthoraAgendamento + 'T' + horario).toISOString();
  
      // Estrutura do novo agendamento
      const newAgendamento = {
        dataatendimento: formattedDataAtendimento,
        dthoraagendamento: formattedDthoraAgendamento,
        horario,
        fk_usuario_id: parseInt(fkUsuarioId),
        fk_servico_id: parseInt(fkServicoId),
      };
  
      // Enviando requisição POST para a API com axios
      const response = await axios.post('http://10.0.2.2:3000/agendamento/inserir', newAgendamento, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Verificando a resposta do servidor
      if (response.status === 201) {
        Alert.alert('Sucesso', response.data.message);
        router.push('/Login'); // Redireciona para a tela de login após cadastro
      }
  
      // Limpeza do estado
      setDataAtendimento('');
      setDthoraAgendamento('');
      setHorario('');
      setFkUsuarioId('');
      setFkServicoId('');
  
    } catch (error) {
      // Tratamento de erro aprimorado
      if (axios.isAxiosError(error)) {
        // Caso seja erro do Axios
        const errorMessage = error.response?.data?.message || `Erro: ${error.message}`;
        Alert.alert('Erro', errorMessage);
  
        // Adicionando mais logs para diagnosticar o erro
        console.error('Erro detalhado do Axios:', error.response?.data);
        console.error('Erro status:', error.response?.status);
        console.error('Erro headers:', error.response?.headers);
      } else if (error instanceof Error) {
        // Caso seja um erro genérico do JavaScript
        console.error('Erro ao adicionar agendamento:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com logo e nome */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/Elysium.png')} style={styles.image} />
        <Text style={styles.brand}>Elysium Beauty</Text>
      </View>

      <Text style={styles.title}>Adicionar Agendamento</Text>
      <TextInput
        label="Data Atendimento"
        mode="outlined"
        value={dataAtendimento}
        onChangeText={setDataAtendimento}
        style={styles.input}
        placeholder="YYYY-MM-DD"
      />
      <TextInput
        label="Data Agendamento"
        mode="outlined"
        value={dthoraAgendamento}
        onChangeText={setDthoraAgendamento}
        style={styles.input}
        placeholder="YYYY-MM-DD"
      />
      <TextInput
        label="Horário"
        mode="outlined"
        value={horario}
        onChangeText={setHorario}
        style={styles.input}
        placeholder="HH:mm:ss"
      />
      <TextInput
        label="ID Usuário"
        mode="outlined"
        value={fkUsuarioId}
        onChangeText={setFkUsuarioId}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="ID Serviço"
        mode="outlined"
        value={fkServicoId}
        onChangeText={setFkServicoId}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Adicionar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D2B48C', // Marrom claro
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D4037',
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
});

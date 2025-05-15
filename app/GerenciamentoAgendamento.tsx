import * as React from 'react';
import { Provider as PaperProvider, DataTable, TextInput, Modal, Portal, IconButton, Button, Text } from 'react-native-paper';
import { SafeAreaView, StyleSheet, ScrollView, Image, View} from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000'; // Use o IP da sua máquina

type Agendamento = {
  id?: number;
  dataAtendimento: string;
  dthoraAgendamento: string;
  horario: string;
  fkUsuarioId: number;
  fkServicoId: number;
  usuarioNome?: string;   // propriedade opcional para o nome do usuário
  tipoServico?: string;   // propriedade opcional para o nome do serviço
  // Outras propriedades que você precise...
};

const GerenciamentoAgendamento = () => {
  const [visible, setVisible] = React.useState({
    addAgendamento: false,
    editAgendamento: false,
    deleteAgendamento: false,
  });

  const [currentAgendamento, setCurrentAgendamento] = React.useState<Agendamento | null>(null);
  const [agendamentos, setAgendamentos] = React.useState<Agendamento[]>([]);
  const [newAgendamento, setNewAgendamento] = React.useState<Agendamento>({
    dataAtendimento: '',
    dthoraAgendamento: '',
    horario: '',
    fkUsuarioId: 0,
    fkServicoId: 0,
  });

  const fetchAgendamentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/agendamentos_vw`); // Ajuste a URL para corresponder à rota no Express
      console.log('Dados recebidos:', response.data); // Verificando os dados
      
      // Mapeando os dados recebidos para um formato adequado
      setAgendamentos(response.data.map((item: any) => ({
        id: item.agendamento_id, // Adiciona a chave única
        dataAtendimento: item.dataatendimento,
        dthoraAgendamento: item.dthoraagendamento,
        horario: item.horario,
        usuarioNome: item.usuario_nome,
        tipoServico: item.tiposervico,
        usuarioEmail: item.usuario_email,
        valor: item.valor,
        // Você pode incluir outros campos se precisar
      })));
      
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', (error as Error).message);
    }
  };  

  const addAgendamento = async () => {
    try {
      // Assegure-se de que a estrutura de newAgendamento está correta
      const newAgendamento = {
        dthoraagendamento: "2025-03-06T15:00:00",  // Exemplo do formato ISO
        dataatendimento: "2025-03-06T14:00:00",
        horario: "14:00:00",
        fk_usuario_id: 1,  // Certifique-se de que o nome da chave está correto
        fk_servico_id: 2,
      };
  
      // Requisição POST com axios
      await axios.post(`${API_URL}/agendamento/inserir`, newAgendamento);
  
      // Limpeza do estado
      setNewAgendamento({
        dataAtendimento: '',
        dthoraAgendamento: '',
        horario: '',
        fkUsuarioId: 0,
        fkServicoId: 0,
      });
  
      // Fechar modal e atualizar a lista de agendamentos
      hideModal('addAgendamento');
      fetchAgendamentos();
  
    } catch (error: unknown) {
      // Verificar o tipo do erro
      if (error instanceof Error) {
        console.error('Erro ao adicionar agendamento:', error.message);
      } else if (axios.isAxiosError(error)) {
        // Caso seja um erro do Axios
        console.error('Erro ao adicionar agendamento:', error.response ? error.response.data : error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };  

  const updateAgendamento = async () => {
    if (currentAgendamento?.id) {
      try {
        // Garantir que currentAgendamento contém dados válidos antes de enviá-los
        const agendamentoAtualizado = {
          dthoraagendamento: currentAgendamento.dthoraAgendamento, // Exemplo de dados
          dataatendimento: currentAgendamento.dataAtendimento,
          horario: currentAgendamento.horario,
          fk_usuario_id: currentAgendamento.fkUsuarioId,
          fk_servico_id: currentAgendamento.fkServicoId,
        };
  
        // Realiza a requisição PUT com os dados atualizados
        await axios.put(`${API_URL}/agendamento/atualizar/${currentAgendamento.id}`, agendamentoAtualizado);
  
        // Limpeza do estado
        setCurrentAgendamento(null);
        
        // Fechar o modal de edição
        hideModal('editAgendamento');
        
        // Atualizar a lista de agendamentos
        fetchAgendamentos();
  
      } catch (error: unknown) {
        // Verificar o tipo de erro
        if (error instanceof Error) {
          console.error('Erro ao atualizar agendamento:', error.message);
        } else if (axios.isAxiosError(error)) {
          // Caso seja um erro do Axios
          console.error('Erro ao atualizar agendamento:', error.response ? error.response.data : error.message);
        } else {
          console.error('Erro desconhecido:', error);
        }
      }
    } else {
      console.error('ID do agendamento não encontrado.');
    }
  };  

  const deleteAgendamento = async () => {
    if (currentAgendamento?.id) {
      try {
        await axios.delete(`${API_URL}/agendamento/deletar/${currentAgendamento.id}`);
        setCurrentAgendamento(null);
        hideModal('deleteAgendamento');
        fetchAgendamentos();
      } catch (error) {
        console.error('Erro ao deletar agendamento:', (error as Error).message);
      }
    }
  };

  React.useEffect(() => {
    fetchAgendamentos();
  }, []);

  const showModal = (type: 'addAgendamento' | 'editAgendamento' | 'deleteAgendamento') => {
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type: 'addAgendamento' | 'editAgendamento' | 'deleteAgendamento') => {
    setVisible({ ...visible, [type]: false });
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {/* Adicionando a imagem acima do botão */}
                <Image 
                  source={require('../assets/images/Elysium.png')} 
                  style={styles.image} 
                />
        <Button
                  icon="plus"
                  mode="contained"
                  onPress={() => showModal('addAgendamento')}
                  textColor="white" // Cor branca para o texto
                  buttonColor="green" // Cor verde para o fundo do botão
                  contentStyle={{ flexDirection: 'row', alignItems: 'center' }} // Alinha ícone e texto horizontalmente
                  labelStyle={{ marginLeft: 12 }} // Aumenta o espaçamento entre o ícone e o texto
                >
                  Adicionar Agendamento
                </Button>
        {/* ScrollView com rolagem horizontal */}
<ScrollView horizontal style={styles.scrollContainer}>
  <ScrollView style={styles.verticalScroll}>
    <DataTable style={styles.dataTable}>
      <DataTable.Header>
        <DataTable.Title style={styles.columnHeader}>
           <Text style={styles.columnHeaderText}>Data do Agendamento</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>
           <Text style={styles.columnHeaderText}>Data do Atendimento</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>
           <Text style={styles.columnHeaderText}>Horario</Text>             
        </DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>
          <Text style={styles.columnHeaderText}>Serviço</Text>
        </DataTable.Title>
        <DataTable.Title style={styles.columnHeader}>
          <Text style={styles.columnHeaderText}>Usuario</Text>
        </DataTable.Title>              
        <DataTable.Title style={styles.columnHeader}>
          <Text style={styles.columnHeaderText}>Ações</Text>
        </DataTable.Title>
      </DataTable.Header>

      {agendamentos.length > 0 ? (
        agendamentos.map(agendamento => (
          <DataTable.Row key={agendamento.id}>
            <DataTable.Cell style={styles.columnCell}><Text>{agendamento.dataAtendimento}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.columnCell}><Text>{agendamento.dthoraAgendamento}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.columnCell}><Text>{agendamento.horario}</Text></DataTable.Cell>
            <DataTable.Cell style={styles.columnCell}><Text>{agendamento.tipoServico}</Text></DataTable.Cell>
<DataTable.Cell style={styles.columnCell}><Text>{agendamento.usuarioNome}</Text></DataTable.Cell>

            <DataTable.Cell style={styles.columnCell}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => {
                  setCurrentAgendamento(agendamento);
                  showModal('editAgendamento');
                }}
                iconColor="blue"
              />
              <IconButton icon="delete" size={20} onPress={() => {
                  setCurrentAgendamento(agendamento);
                  showModal('deleteAgendamento');
                }} 
                 iconColor="red"
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))
      ) : (
        <DataTable.Row>
          <DataTable.Cell><Text>Nenhum agendamento encontrado</Text></DataTable.Cell>
        </DataTable.Row>
      )}
    </DataTable>
  </ScrollView>
</ScrollView>



        {/* Modais */}
        <Portal>
          <Modal visible={visible.addAgendamento} onDismiss={() => hideModal('addAgendamento')} contentContainerStyle={styles.modal}>
            {/* Cabeçalho */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Agendamento</Text>
            </View>

            {/* Corpo */}
            <View style={styles.modalContent}>
              <TextInput
                label="Data Atendimento"
                mode="outlined"
                value={newAgendamento.dataAtendimento}
                onChangeText={text => setNewAgendamento(prev => ({ ...prev, dataAtendimento: text }))}
              />
              <TextInput
                label="Data Agendamento"
                mode="outlined"
                value={newAgendamento.dthoraAgendamento}
                onChangeText={text => setNewAgendamento(prev => ({ ...prev, dthoraAgendamento: text }))}
              />
              <TextInput
                label="Horário"
                mode="outlined"
                value={newAgendamento.horario}
                onChangeText={text => setNewAgendamento(prev => ({ ...prev, horario: text }))}
              />
              <TextInput
                label="ID Usuário"
                mode="outlined"
                value={String(newAgendamento.fkUsuarioId)}
                onChangeText={text => setNewAgendamento(prev => ({ ...prev, fkUsuarioId: Number(text) }))}
              />
              <TextInput
                label="ID Serviço"
                mode="outlined"
                value={String(newAgendamento.fkServicoId)}
                onChangeText={text => setNewAgendamento(prev => ({ ...prev, fkServicoId: Number(text) }))}
              />
            </View>

            {/* Rodapé */}
            <View style={styles.modalFooter}>
              <Button mode="contained" onPress={addAgendamento}>Adicionar</Button>
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.editAgendamento} onDismiss={() => hideModal('editAgendamento')} contentContainerStyle={styles.modal}>
            {/* Cabeçalho */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Agendamento</Text>
            </View>

            {/* Corpo */}
            <View style={styles.modalContent}>
              <TextInput
                label="Data Atendimento"
                mode="outlined"
                value={currentAgendamento?.dataAtendimento || ''}
                onChangeText={text => setCurrentAgendamento(prev => prev ? { ...prev, dataAtendimento: text } : null)}
              />
              <TextInput
                label="Data Agendamento"
                mode="outlined"
                value={currentAgendamento?.dthoraAgendamento || ''}
                onChangeText={text => setCurrentAgendamento(prev => prev ? { ...prev, dthoraAgendamento: text } : null)}
              />
              <TextInput
                label="Horário"
                mode="outlined"
                value={currentAgendamento?.horario || ''}
                onChangeText={text => setCurrentAgendamento(prev => prev ? { ...prev, horario: text } : null)}
              />
              <TextInput
                label="ID Usuário"
                mode="outlined"
                value={String(currentAgendamento?.fkUsuarioId || '')}
                onChangeText={text => setCurrentAgendamento(prev => prev ? { ...prev, fkUsuarioId: Number(text) } : null)}
              />
              <TextInput
                label="ID Serviço"
                mode="outlined"
                value={String(currentAgendamento?.fkServicoId || '')}
                onChangeText={text => setCurrentAgendamento(prev => prev ? { ...prev, fkServicoId: Number(text) } : null)}
              />
            </View>

            {/* Rodapé */}
            <View style={styles.modalFooter}>
              <Button mode="contained" onPress={updateAgendamento}>Salvar</Button>
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.deleteAgendamento} onDismiss={() => hideModal('deleteAgendamento')} contentContainerStyle={styles.modal}>
            {/* Cabeçalho */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Deletar Agendamento</Text>
            </View>

            {/* Corpo */}
            <View style={styles.modalContent}>
              <Text>Deseja realmente excluir este agendamento?</Text>
            </View>

            {/* Rodapé */}
            <View style={styles.modalFooter}>
              <Button mode="contained" onPress={deleteAgendamento}>Excluir</Button>
              <Button onPress={() => hideModal('deleteAgendamento')}>Cancelar</Button>
            </View>
          </Modal>
        </Portal>


      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D2B48C', // Cor marrom claro
  },
  
  image: {
    width: 100, // Define a largura da imagem
    height: 100, // Define a altura da imagem, igual à largura
    resizeMode: 'cover', // Ajusta a imagem para cobrir o container
    marginBottom: 20, // Espaçamento entre a imagem e o botão
    borderRadius: 50, // Aplica bordas arredondadas (50% de 100px)
    alignSelf: 'center', // Centraliza a imagem horizontalmente
  },
  dataTable: {
    minWidth: 600,
  },
  // ... outros estilos
  verticalScroll: {
    maxHeight: 400, // Ajuste o valor conforme necessário para o tamanho da sua tela
  },
  scrollContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
   modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '70%',
    alignSelf: 'center',
  },
  modalHeader: {
    backgroundColor: '#D2B48C', // Marrom claro
    alignItems: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Cor do texto no cabeçalho
  },
  modalContent: {
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  gridItem: {
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  modalFooter: {
    backgroundColor: '#D2B48C', // Marrom claro
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',  // Cor vermelha para o botão de deletar
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  columnHeader: {
    width: 200, // Aumente conforme necessário
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCell: {
    width: 200, // Deve ser o mesmo valor do cabeçalho
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },   
  columnHeaderText: {
    color: 'white', // Cor do texto do cabeçalho
  },
});

export default GerenciamentoAgendamento;

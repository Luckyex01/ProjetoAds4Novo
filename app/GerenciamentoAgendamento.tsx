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
                  source={require('../assets/images/logoLuckyFly.png')} 
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
    padding: 20,
    backgroundColor: '#111827', // Fundo escuro para um look futurista
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 60,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#00CC6A', // Acento verde
  },
  serviceContainer: {
    paddingBottom: 40,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  headingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00CC6A', // Verde de destaque
  },
  headingSubtitle: {
    fontSize: 18,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  cardWrapper: {
    marginBottom: 24,
  },
  serviceItem: {
    borderRadius: 15,
    padding: 24,
    marginHorizontal: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00CC6A',
    marginVertical: 10,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00CC6A',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#111827',
  },
  modalBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#374151',
  },
  modalBackText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 12,
  },
  modalContentWrapper: {
    flex: 1,
    padding: 24,
    backgroundColor: '#1F2937',
  },
  modal: {
    backgroundColor: '#1F2937',
    padding: 24,
    borderRadius: 12,
    width: '85%',
    maxHeight: '75%',
    alignSelf: 'center',
  },
  modalHeader: {
    backgroundColor: '#00CC6A',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalContent: {
    flex: 1,
    marginBottom: 24,
  },
  modalFooter: {
    backgroundColor: '#00CC6A',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 12,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 12,
  },
  verticalScroll: {
    maxHeight: 420,
  },
  scrollContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  dataTable: {
    minWidth: 600,
  },
  columnHeader: {
    width: 220,
    borderRightWidth: 1,
    borderRightColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  columnCell: {
    width: 220,
    borderRightWidth: 1,
    borderRightColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  columnHeaderText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'column',
    marginBottom: 18,
  },
  gridItem: {
    marginBottom: 14,
  },
});

export default GerenciamentoAgendamento;

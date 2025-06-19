import * as React from 'react';
import { Provider as PaperProvider, DataTable, TextInput, Modal, Portal, IconButton, Button, Text } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native'; 
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

const GerenciamentoServico = () => {
  const [visible, setVisible] = React.useState({
    addService: false,
    editService: false,
    deleteService: false,
  });

  const [currentService, setCurrentService] = React.useState<{ id?: string; tiposervico: string; valor: string } | null>(null);
  const [services, setServices] = React.useState<{ id?: string; tiposervico: string; valor: string }[]>([]);
  const [newService, setNewService] = React.useState<{ tiposervico: string; valor: string }>({ tiposervico: '', valor: '' });

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/servicos`);
      setServices(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', (error as Error).message);
    }
  };

  const addService = async () => {
    try {
      await axios.post(`${API_URL}/servico/inserir`, newService);
      setNewService({ tiposervico: '', valor: '' });
      hideModal('addService');
      fetchServices();
    } catch (error) {
      console.error('Erro ao adicionar serviço:', (error as Error).message);
    }
  };

  const updateService = async () => {
    if (currentService?.id) {
      try {
        await axios.put(`${API_URL}/servico/atualizar/${currentService.id}`, currentService);
        setCurrentService(null);
        hideModal('editService');
        fetchServices();
      } catch (error) {
        console.error('Erro ao atualizar serviço:', (error as Error).message);
      }
    }
  };

  const deleteService = async () => {
    if (currentService?.id) {
      try {
        await axios.delete(`${API_URL}/servico/deletar/${currentService.id}`);
        setCurrentService(null);
        hideModal('deleteService');
        fetchServices();
      } catch (error) {
        console.error('Erro ao deletar serviço:', (error as Error).message);
      }
    }
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  const showModal = (type: 'addService' | 'editService' | 'deleteService') => {
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type: 'addService' | 'editService' | 'deleteService') => {
    setVisible({ ...visible, [type]: false });
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Image 
          source={require('../assets/images/logoLuckyFly.png')} 
          style={styles.image} 
        />        
        <Button
          icon="plus"
          mode="contained"
          onPress={() => showModal('addService')}
          textColor="white"
          buttonColor="green"
          contentStyle={{ flexDirection: 'row', alignItems: 'center' }}
          labelStyle={{ marginLeft: 12 }}
        >
          Adicionar Serviço
        </Button>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Tipo de Serviço</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Valor</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Ações</Text>
            </DataTable.Title>
          </DataTable.Header>

          {services.length > 0 ? (
            services.map(service => (
              <DataTable.Row key={service.id}>
                <DataTable.Cell style={styles.columnCell}><Text>{service.tiposervico}</Text></DataTable.Cell>
                <DataTable.Cell style={styles.columnCell}><Text>{service.valor}</Text></DataTable.Cell>
                <DataTable.Cell style={styles.columnCell}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => {
                      setCurrentService(service);
                      showModal('editService');
                    }}
                    iconColor="blue"
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => {
                      setCurrentService(service);
                      showModal('deleteService');
                    }}
                    iconColor="red"
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <DataTable.Row>
              <DataTable.Cell><Text>Nenhum serviço encontrado</Text></DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>

        {/* Modais para Serviços */}

        <Portal>
          <Modal visible={visible.addService} onDismiss={() => hideModal('addService')} contentContainerStyle={styles.modal}>
            {/* Cabeçalho */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Serviço</Text>
            </View>
            {/* Corpo */}
            <View style={styles.modalContent}>
              <View style={styles.gridContainer}>
                <TextInput
                  label="Tipo de Serviço"
                  mode="outlined"
                  value={newService.tiposervico}
                  onChangeText={text => setNewService(prev => ({ ...prev, tiposervico: text }))}
                  style={styles.gridItem}
                />
                <TextInput
                  label="Valor"
                  mode="outlined"
                  onChangeText={text => setNewService(prev => ({ ...prev, valor: text }))}
                  style={styles.gridItem}
                />
               </View>
               
              </View>
            {/* Rodapé */}
           <View style={styles.modalFooter}>
             <Button mode="contained" onPress={addService}>Adicionar</Button>
           </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.editService} onDismiss={() => hideModal('editService')} contentContainerStyle={styles.modal}>
            {/* Cabeçalho */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Serviço</Text>
            </View>

            <View style={styles.modalContent}>
              <View style={styles.gridContainer}>
                <TextInput
                  label="Tipo de Serviço"
                  mode="outlined"
                  value={currentService?.tiposervico || ''}
                  onChangeText={text => setCurrentService(prev => prev ? { ...prev, tiposervico: text } : null)}
                  style={styles.gridItem}
                />
                <TextInput
                  label="Valor"
                  mode="outlined"
                  value={currentService?.valor || ''}
                  onChangeText={text => setCurrentService(prev => prev ? { ...prev, valor: text } : null)}
                  style={styles.gridItem}
                />
              </View>
            </View>
            {/* Rodapé */}
            <View style={styles.modalFooter}>
            <Button mode="contained" onPress={updateService}>Atualizar</Button>
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.deleteService} onDismiss={() => hideModal('deleteService')} contentContainerStyle={styles.modal}>
            <View style={styles.modalContent}>
              {/* Cabeçalho */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Deletar Serviço</Text>
              </View>

              {/* Corpo */}
              <Text style={styles.modalText}>
                Você tem certeza que deseja deletar o serviço <Text style={styles.bold}>{currentService?.tiposervico}</Text>?
              </Text>

              {/* Rodapé */}
              <View style={styles.modalFooter}>
                <Button mode="contained" onPress={deleteService} style={styles.deleteButton}>Deletar</Button>
              </View>
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
    backgroundColor: '#111827', // Fundo escuro para um visual futurista
  },
  image: {
    width: 120, // Aumentada a largura para destacar melhor a imagem
    height: 120, // Altura igual à largura para manter formato quadrado
    resizeMode: 'cover',
    marginBottom: 24,
    borderRadius: 60, // Bordas totalmente arredondadas
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#00CC6A', // Acento verde vibrante
  },
  columnHeader: {
    borderRightWidth: 1,
    borderRightColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  columnHeaderText: {
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto branco para chamar a atenção
    fontSize: 14, // Tamanho ajustado para evitar cortes
  },
  columnCell: {
    borderRightWidth: 1,
    borderRightColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 6,
  },
  modal: {
    backgroundColor: '#1F2937', // Fundo escuro para os modais
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    backgroundColor: '#00CC6A', // Cabeçalho com acento verde para destacar
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalText: {
    marginVertical: 16,
    textAlign: 'center',
    fontSize: 16,
    color: '#E5E7EB', // Cinza claro para contraste suave
  },
  gridContainer: {
    width: '100%',
    marginTop: 12,
    gap: 10,
  },
  gridItem: {
    width: '100%',
  },
  modalFooter: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#00CC6A', // Rodapé com a mesma cor do cabeçalho
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Vermelho para ação de exclusão
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default GerenciamentoServico;

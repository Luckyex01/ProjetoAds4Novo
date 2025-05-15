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
          source={require('../assets/images/Elysium.png')} 
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
  columnHeader: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderText: {
    fontWeight: 'bold',
  },
  columnCell: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    backgroundColor: '#D2B48C', // Marrom claro
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Texto branco para contraste
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
  },
  gridContainer: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  gridItem: {
    width: '100%',
  },
  modalFooter: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#D2B48C', // Mudando para branco
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default GerenciamentoServico;

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Modal, FlatList, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg'; // Importação para gerar QR Codes




export default function Inicio() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblecar, setModalVisiblecar] = useState(false);
  const [modalVisiblesobre, setModalVisiblesobre] = useState(false);
  const [modalVisiblebrasileirao, setModalVisiblebrasileirao] = useState(false);
  const [modalVisibleQR, setModalVisibleQR] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [carrinho, setCarrinho] = useState([]); // Estado do carrinho



  // Estado para a lista de camisas
  const [camisas, setCamisas] = useState([
    { id: '1', image: require('./Inicio/saopaulo.png'), name: 'Camisa São Paulo', price: 'R$ 149,90' },
    { id: '2', image: require('./Inicio/flamengo.png'), name: 'Camisa Flamengo', price: 'R$ 149,90' },
    { id: '3', image: require('./Inicio/cruzeiro.png'), name: 'Camisa Cruzeiro', price: 'R$ 149,90' },
    { id: '4', image: require('./Inicio/palmeiras.png'), name: 'Camisa Palmeiras', price: 'R$149,90' },
  ]);

  const [camisasEuropa, setCamisasEuropa] = useState([
    { id: '1', image: require('./Inicio/real.png'), name: 'Camisa Real Madrid', prece: 'R$ 249,90' },
    { id: '2', image: require('./Inicio/psg1.png'), name: 'Camisa PSG', prece: 'R$ 249,90' },
    { id: '3', image: require('./Inicio/barcelona.png'), name: 'Camisa Barcelona', prece: 'R$ 249,90' },
    { id: '4', image: require('./Inicio/city.png'), name: 'Camisa Manchister City', prece: 'R$ 249,90' },
  ]);

  const [camisasCM, setCamisasCM] = useState([
    { id: '1', image: require('./Inicio/brasil.png'), name: 'Camisa Brasil', prece: 'R$ 349,90' },
    { id: '2', image: require('./Inicio/argentina.png'), name: 'Camisa Argentina', prece: 'R$ 349,90' },
    { id: '3', image: require('./Inicio/croacia.png'), name: 'Camisa Croacia', prece: 'R$ 349,90' },
    { id: '4', image: require('./Inicio/portugal.png'), name: 'Camisa Portugal', prece: 'R$ 349,90' },
  ]);


  const renderItemCarrinho = ({ item }) => (
    <View style={styles.itemCarrinho}>
      <Image source={item.image} style={styles.carrinhoImage} />
      <View>
        <Text style={styles.carrinhoNome}>{item.name}</Text>
        <Text style={styles.carrinhoPreco}>{item.price}</Text>
      </View>
    </View>
  );



  const openQRModal = (item) => {
    setSelectedItem(item); // Define o item selecionado
    setModalVisibleQR(true); // Exibe o modal do QR Code
  };

  const closeQRModal = () => {
    setModalVisibleQR(false);
    setSelectedItem(null); // Reseta o item selecionado
  };

  const adicionarAoCarrinho = (item) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, item]);
  };

  

  const route = useRoute();
  const userEmail = route.params?.userEmail;


  



  return ( /* tela Inicial */
      <SafeAreaView style={styles.container}>
        <ScrollView>
      <ImageBackground source={require('./Inicio/fundo.png')} style={styles.imageBackground}>
        <View style={styles.black}>
          <Text style={styles.text}>MVF SPORT</Text>
          <TouchableOpacity style={styles.imageButton} onPress={() => setModalVisiblecar(true)}>
            <Image source={require('./Inicio/car.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButtonc} onPress={() => setModalVisible(true)}>
            <Image source={require('./Inicio/menu.png')} style={styles.buttonImagec} />
          </TouchableOpacity> 

          <View /* View do Nav Bar dos botoes das camisas */ style={styles.buttonContainer}>  
            <TouchableOpacity style={styles.button}> 
              <Text style={styles.buttonText}>BRASILEIRÃO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>EUROPA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>COPA DO MUNDO</Text>
            </TouchableOpacity>
          </View>
        </View> 


        <FlatList data={camisas} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flatListContent}  renderItem={({ item }) => ( // Use um estilo definido para a lista
                <View style={styles.camisaCard}>
                  <View style={styles.camisaItem}>
                    <Image source={item.image} style={styles.camisaImage} />
                  </View>
                  <Text style={styles.camisaNome}>{item.name}</Text>
                  <Text style={styles.camisaPreco}>{item.price}</Text>
                  <View style={styles.buttonContainerCard}>
                    <TouchableOpacity style={styles.comprarButton} onPress={() => openQRModal(item)}>
                      <Text style={styles.buttonTextCard}>Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addCarrinhoButton} onPress={() => adicionarAoCarrinho(item)}>
                      <Text style={styles.buttonTextCard}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />


            <FlatList data={camisasEuropa} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flatListContent}  renderItem={({ item }) => ( // Use um estilo definido para a lista
                <View style={styles.camisaCard}>
                  <View style={styles.camisaItem}>
                    <Image source={item.image} style={styles.camisaImage} />
                  </View>
                  <Text style={styles.camisaNome}>{item.name}</Text>
                  <Text style={styles.camisaPreco}>{item.prece}</Text>
                  <View style={styles.buttonContainerCard}>
                    <TouchableOpacity style={styles.comprarButton}>
                      <Text style={styles.buttonTextCard} onPress={() => openQRModal(item)}>Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addCarrinhoButton} onPress={() => adicionarAoCarrinho(item)}>
                      <Text style={styles.buttonTextCard}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

          <FlatList data={camisasCM} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flatListContent}  renderItem={({ item }) => ( // Use um estilo definido para a lista
                <View style={styles.camisaCard}>
                  <View style={styles.camisaItem}>
                    <Image source={item.image} style={styles.camisaImage} />
                  </View>
                  <Text style={styles.camisaNome}>{item.name}</Text>
                  <Text style={styles.camisaPreco}>{item.prece}</Text>
                  <View style={styles.buttonContainerCard}>
                    <TouchableOpacity style={styles.comprarButton} onPress={() => openQRModal(item)}>
                      <Text style={styles.buttonTextCard}>Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addCarrinhoButton} onPress={() => adicionarAoCarrinho(item)}>
                      <Text style={styles.buttonTextCard}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />    
      </ImageBackground>



      {/* Modal Carrinho */}
      <Modal animationType="slide" transparent={true} visible={modalVisiblecar} onRequestClose={() => {setModalVisiblecar(!modalVisiblecar);}}>
          <ImageBackground source={require('./Inicio/fundo.png')} style={styles.imageBackground}>
          <View style={styles.black3}>
          <Text style={styles.NameCart}>Carrinho</Text>
          <TouchableOpacity
            style={{ ...styles.openButton,width:250,right:30,top:-200,left:-250}}
            onPress={() => setModalVisiblecar(!modalVisiblecar)}>
            <Image source={require('./Inicio/voltar.png')} style={styles.buttonImageV} />
            </TouchableOpacity>
            </View>

            <FlatList data={carrinho} keyExtractor={(item, index) => index.toString()} renderItem={renderItemCarrinho}/>
          </ImageBackground>
        </Modal>



      {/* Modal para exibir QR Code */}
      <Modal
          visible={modalVisibleQR}
          transparent={true}
          animationType="slide"
          onRequestClose={closeQRModal}
        >
          <View style={styles.qrModalContainer}>
            <View style={styles.qrModalContent}>
              <Text style={styles.qrText}>QR Code para {selectedItem?.name}</Text>
              {selectedItem && (
                <QRCode
                  value={`Compra de ${selectedItem.name} no valor de ${selectedItem.price}`}
                  size={200}
                />
              )}
              <TouchableOpacity style={styles.closeQRButton} onPress={closeQRModal}>
                <Text style={styles.buttonTextCard}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>




          <Modal /* modal menu */
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>MVF SPORT</Text>
                {userEmail && <Text style={{...styles.userEmail, textAlign: "center", fontSize:20}}>{userEmail}</Text>}

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#fff',margin: 20,height:40,width:250,alignItems:'center',justifyContent:'center',borderRadius:5}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyleHome}>HOME</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => setModalVisiblesobre(true)}
                  style={{...styles.openButton, backgroundColor: '#fff',margin: 20,height:40,width:250,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                  <Text style={styles.textStyle}>SOBRE NÓS</Text>
                </TouchableOpacity>
                
                

              <Modal /* modal sobre nós */animationType="slide" transparent={true} visible={modalVisiblesobre} onRequestClose={() => {setModalVisiblesobre(!modalVisiblesobre);}}>
                <ImageBackground source={require('./Inicio/fundo.png')} style={styles.imageBackground}>
                <Text style={styles.textsobrenos}>Aqui vai ficar o texto sobre nós</Text>
                <View style={styles.centeredVieww}>
                <View style={styles.black3}> 
                <Text style={styles.textosobree}>SOBRE NÓS</Text>               
                </View>
                <View style={styles.modalView3}>
                  <TouchableOpacity
                    style={{ ...styles.openButton,margin: 20,height:40,width:250,alignItems:'center',justifyContent:'center',right:30,borderRadius:5,top:-140,left:-205}}
                    onPress={() => setModalVisiblesobre(!modalVisiblesobre)}>
                    <Image source={require('./Inicio/voltar.png')} style={styles.buttonImageV} />
                  </TouchableOpacity>
                </View>
                </View>
                </ImageBackground>
              </Modal>

              </View>
            </View>
          </Modal>
          </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  
  
  imgcamisa: {
    width: 100,
    height: 150,
    textAlign: "center",
  },
  
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    height:'100%',
    width:'100%',
  },
  
  text: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    top: 70,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: -1,
    borderRadius: 5,
    top:-200,
  },
  
  textcar: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    bottom: -170,
  },
  
  black: {
    backgroundColor: '#000',
    width: '100%',
    height:200,
    alignItems:'center',
    position:'relative',
    left: 0, 
    right: 0, 
    bottom: 0,
  },
  
  black3: {
    backgroundColor: '#000',
    width: '100%',
    height:100,
    alignItems:'center',
    position:'relative',
    left: 0, 
    right: 0, 
    bottom: 0,
  },

  buttonContainer: {
    flexDirection: 'row',
    top: 240,
    alignItems:'center',
    justifyContent: 'center',
  },
  
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  imageButton: { // imagem menu lateral
    top: -200,
    height: 10,
    right: 10,
  },

  imageButtonc: { // imagem carrinho
    top: -200,
    right: 10,
    width: 600,
  },
  
  buttonImage: {
    top: 160,
    height: 70,
    width: 70,
    right: -170,
  },

  buttonImageV: {
    top: 160,
    height: 70,
    width: 70,
    right: -170,
  },
  
  btmais: {
    height: 60,
    width: 60,
    left: 80,
    top: 100,
  },
  
  bttmais: {
    height: 250,
    width: 250,
    left: 40,
    top: 80,
  },

  buttonImagec: {
    top: 160,
    height: 50,
    width: 50,
    right: -140,
    left: 120,
  },
  
  nav: {
    backgroundColor: '#fff',
    width: 300,
    height: 400,
    left: 90,
    top: 250,
    borderRadius: 20,
  },
  
  btcamisas: {
    width: 50,
    height: 50,
  },
  
  carrinhonome: {
    color: "#fff",
    right: -190,
    fontSize: 30,
  },
  
  camisas: {
    width: 450,
    height: 400,
    left: -65,
    top: 30,
  },
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  centeredVieww: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000',
    width: 410,
    height: 150,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  
  modalView: {
    margin: 20,
    backgroundColor: "#A39E9E",
    borderRadius: 20,
    padding: 35,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 300,
      height: 400,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  modalView2: {
    width: 500,
    height: 1000,
  },
  
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#000",
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: 120,
  },
  
  centeredVieww: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000',
    width: 410,
    height: 150,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  
  textosobree: {
    color: '#fff',
    fontSize: 30,
  },
  
  textsobrenos: {
    color: '#000',
    fontSize: 20,
    top: 155,
  },

  camisasContainer: {
    top: 10,
    flex:1,

  },
  
  flatListContent: {
    justifyContent: 'center', // Centraliza os itens dentro da lista
    alignItems: 'center',
    height: 350,
  },
  
  camisaCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.6, // Ajuste o tamanho do card se necessário
    elevation: 10, // Sombras para destacar o card
    marginTop:15,
    top:5,
  },
  
  camisaItem: {
    width: '100%',
    height: 150, // Ajuste a altura da imagem da camisa
    marginBottom: 10,
  },
  
  camisaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ajuste a imagem dentro do card
  },
  
  camisaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  
  camisaPreco: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  
  buttonContainerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  
  comprarButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  
  addCarrinhoButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 5,
  },
  
  buttonTextCard: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },

  textobrasileirão: {
    color: '#fff',        // Ajuste a imagem dentro do card
    fontSize: 30,
  }, 

  qrModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  qrModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  qrText: {
    fontSize: 18,
    marginBottom: 20,
  },

  closeQRButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },

  NameCart: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    top: 10,
  }

});

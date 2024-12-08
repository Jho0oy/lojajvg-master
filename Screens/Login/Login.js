import { StatusBar, replace, router, Modal, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TextInput, Alert, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { auth } from '../firebaseconfig';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigation();

  function nextscreen() {
    navigate.navigate('Inicio');
  }

  const [isEsqueceuSenhaModalVisible, setIsEsqueceuSenhaModalVisible] = useState(false);
  const [isCadastrarModalVisible, setIsCadastrarModalVisible] = useState(false);

  const openEsqueceuSenhaModal = () => {
    setIsEsqueceuSenhaModalVisible(true);
  };

  const closeEsqueceuSenhaModal = () => {
    setIsEsqueceuSenhaModalVisible(false);
  };

  const openCadastrarModal = () => {
    setIsCadastrarModalVisible(true);
  };

  const closeCadastrarModal = () => {
    setIsCadastrarModalVisible(false);
  };

  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userRePass, setUserRePass] = useState('');

  // Resetar senha
  function replacePass() {
    if (userMail !== '') {
      sendPasswordResetEmail(auth, userMail)
        .then(() => {
          alert("Foi enviado um email para: " + userMail + ". Verifique sua caixa de email.");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert("Ops! Alguma coisa não deu certo. " + errorMessage + " Tente novamente ou volte para tela de login");
        });
    } else {
      alert("É preciso informar um e-mail válido para efetuar a redefinição de senha");
    }
  }

  // Logar na conta existente
  function userLogin() {
    signInWithEmailAndPassword(auth, userMail, userPass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // Navegar para a tela "Inicio" após login bem-sucedido, passando o email do usuário
        navigate.navigate('Inicio', { userEmail: userMail });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert('Todos os campos devem ser preenchidos! ' + errorMessage);
      });
  }

  // Cadastrar usuário
  function newUser() {
    if (userMail === '' || userPass === '' || userRePass === '') {
      alert('Todos os campos devem ser preenchidos!');
      return;
    }
    if (userPass !== userRePass) {
      alert('A senha e a confirmação não são iguais');
      return;
    } else {
      createUserWithEmailAndPassword(auth, userMail, userPass)
        .then((userCredential) => {
          const user = userCredential.user;
          alert('O usuário "' + userMail + '" foi criado. Faça o login');
          setIsCadastrarModalVisible(false);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./Login/login.png')} style={styles.imageBackground}>
        <View style={styles.overlay1}>
          <Text style={styles.overlayText}>Login</Text>
          <TextInput style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={userMail}
            onChangeText={setUserMail}
          />
          <TextInput style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={userPass}
            onChangeText={setUserPass}
          />
          <TouchableOpacity onPress={openEsqueceuSenhaModal}>
            <Text style={styles.esqueceusenha}>Esqueceu a Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCadastrarModal}>
            <Text style={styles.cadastrar}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(userLogin)} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Modal para esqueceu senha */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEsqueceuSenhaModalVisible}
        onRequestClose={closeEsqueceuSenhaModal}
      >
        <View style={styles.modal1}>
          <ImageBackground source={require('./Login/login.png')} style={styles.imageBackground}>
            <TouchableOpacity onPress={closeEsqueceuSenhaModal} style={styles.closeIcon}>
              <Image source={require('./Login/voltar.png')} style={{ width: 90, height: 100, top: 547 }} />
            </TouchableOpacity>
            <View style={styles.modalContentt}>
              <View>
                <View style={styles.overlay2}>
                  <Text style={styles.overlayText1}>Resetar Senha</Text>
                  <TextInput style={styles.input1}
                    placeholder="Informe o email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={userMail}
                    onChangeText={setUserMail}
                  />
                  <Pressable style={styles.buttonn} onPress={replacePass}>
                    <Text style={styles.buttonText}>Resetar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Modal>

      {/* Modal para cadastrar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCadastrarModalVisible}
        onRequestClose={closeCadastrarModal}
      >
        <View style={styles.modal1}>
          <ImageBackground source={require('./Login/login.png')} style={styles.imageBackground}>
            <TouchableOpacity onPress={closeCadastrarModal} style={styles.closeIcon}>
              <Image source={require('./Login/voltar.png')} style={{ width: 90, height: 100, top: 547 }} />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <View>
                <View style={styles.overlay3}>
                  <Text style={styles.overlayText2}>Cadastre-se Aqui!</Text>
                  <TextInput style={styles.input2}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={userMail}
                    onChangeText={setUserMail}
                  />
                  <TextInput style={styles.input2}
                    placeholder="Senha"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={userPass}
                    onChangeText={setUserPass}
                  />
                  <TextInput style={styles.input2}
                    placeholder="Repetir senha"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={userRePass}
                    onChangeText={setUserRePass}
                  />
                  <Pressable style={styles.button} onPress={newUser}>
                    <Text style={styles.buttonText}>Cadastrar </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
}

// Estilos omitidos por questões de espaço...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
  },
  imageBackground:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  overlay1: {
    top: 80,
    width: 300,
    height: 350,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  overlay2: {
    position: 'absolute',
    top: 320,
    transform: [{translateX: -150}, {translateY: -175}],
    width: 300,
    height: 300,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  overlay3: {
    position: 'absolute',
    top: 300,
    transform: [{translateX: -150}, {translateY: -175}],
    width: 300,
    height: 350,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  overlayText: {  
    color: '#fff',
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
  },
  overlayText1: {  
    color: '#fff',
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
  },
  overlayText2: {  
    color: '#fff',
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  input1: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  input2: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonn: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  esqueceusenha:{
    color: '#ffffff',
    marginBottom: 5, // Adicionando margem inferior
    fontSize: 20
  },
  cadastrar:{
    color: '#ffffff',
    marginBottom: 5, // Adicionando margem inferior
    fontSize: 20
  },
  modal1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#000000',
  },
  modal2: {
    borderRadius:10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Cor de fundo com transparência
  },
  modalContentt: {
    width: '100%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '100%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    top:-470,
    color:'#fff',
   
  },
  closeIcon: {
    borderRadius: 1,
    padding: 10,
    elevation: 2,
    top: -505,
    right:165,
  },
});




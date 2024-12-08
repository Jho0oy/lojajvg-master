import {useState} from 'react';
import { StyleSheet, Text, View, Image,  ImageBackground, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Splash() {
  const navigate = useNavigation();

    function nextscreen(){
        navigate.navigate('Login')
    }

    return (
      <View style={styles.container}> 
        <ImageBackground source={require('./Splash/njr.png')} style={styles.imageBackground}>
          <Text style={styles.text}>MVF SPORT</Text> 
          <Text style={styles.text}>Camisas de Time</Text>

          <TouchableOpacity style={styles.butt} activeOpacity={0.7} onPress={()=>{nextscreen()}}>
                    <Text style={styles.to_text}>Entrar</Text>
                </TouchableOpacity>
        </ImageBackground> 
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    bottom: -115
  },
  butt: {
    backgroundColor: 'white',
    paddingHorizontal: '20%',
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 650
  },
  to_text: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
  }
});
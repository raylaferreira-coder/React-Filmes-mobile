import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface RootStackParamList extends ParamListBase{
 Home:undefined;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
   
const handleLogin=()=>{
    navigation.navigate("Home")}

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.login}>
          <Text style={styles.text}>Login</Text>
          <View style={styles.base}>
            <MaterialIcons 
          name="email" 
          size={23} 
          color="#666" 
          style={styles.icon} 
        />
          <TextInput   
            style={styles.input} 
            placeholder="email" 
            onChangeText={(texto) => setEmail(texto)} 
            value={email}
            placeholderTextColor="#888"
          />
            </View >
            <View style={styles.base}>
                  <MaterialIcons 
          name="lock" 
          size={23} 
          color="#666" 
          style={styles.icon} 
        />
          <TextInput 
            style={styles.input}
            placeholder="senha" 
            secureTextEntry={true}
            onChangeText={(senha) => setPassword(senha)} 
            value={password}
            placeholderTextColor="#888"
          /> 
        </View>
          <View style={styles.buttonContainer}>
            <Button title='Entrar' color="#007BFF" onPress={handleLogin}/>

          </View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    width: "170%", 
    backgroundColor: "#fff", 
    borderRadius: 15,
    padding: 40, 
    elevation: 4, 
  },
  base:{
   flexDirection: 'row',    
    alignItems: 'center',    
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd", 
    borderRadius: 10,
    height: 40,
    marginBottom: 20,        
    paddingHorizontal: 5,
  },
  icon:{
marginRight: 10,
  },
  text:{
    textAlign:'center',
    fontFamily:'Arial',
    fontSize: 40,
    marginBottom:10,
    color:'#333',
    shadowColor:'#gray',
    
  },
  input: {
    flex: 1,                  
    height: '100%',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 5, 
    borderRadius:100,
    overflow: 'hidden',
  }
});
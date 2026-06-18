import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  Alert, 
  StyleSheet 
} from "react-native";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviarMensagem() {
    if (!nome || !email || !mensagem) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    Alert.alert(
      "Mensagem enviada!",
      `Obrigado pelo contato, ${nome}.`
    );

    setNome("");
    setEmail("");
    setMensagem("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fale Conosco</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#9ca3af"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#9ca3af"
        keyboardType="email-address" 
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, styles.mensagem]}
        placeholder="Digite sua mensagem"
        placeholderTextColor="#9ca3af"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
        numberOfLines={4}
      />

      <Pressable style={styles.botao} onPress={enviarMensagem}>
        <Text style={styles.textoBotao}>Enviar</Text>
      </Pressable>
    </View>
  );
}
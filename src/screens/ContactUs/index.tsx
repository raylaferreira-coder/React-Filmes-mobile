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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15151a',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e24',
    color: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2e2e38',
  },
  mensagem: {
    minHeight: 100,
    textAlignVertical: 'top', // Garante que o texto comece no topo no Android
  },
  botao: {
    backgroundColor: '#e11d48',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
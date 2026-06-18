import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  function enviarMensagem() {
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
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, styles.mensagem]}
        placeholder="Digite sua mensagem"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
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
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  mensagem: {
    height: 120,
    textAlignVertical: "top",
  },

  botao: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

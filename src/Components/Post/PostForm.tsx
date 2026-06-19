import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

interface PostFormProps {
  onEnviar: (data: { postagem: string }) => void;
}

export default function PostForm({
  onEnviar,
}: PostFormProps) {
  const [postagem, setPostagem] = useState("");
  const [erro, setErro] = useState("");

  const handlePublicar = () => {
    if (!postagem.trim()) {
      setErro("Escreva algo antes de publicar.");
      return;
    }

    onEnviar({
      postagem: postagem.trim(),
    });

    setPostagem("");
    setErro("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nova publicação
      </Text>

      <TextInput
        style={[
          styles.input,
          erro ? styles.inputError : null,
        ]}
        placeholder="O que está a pensar sobre este filme?"
        multiline
        value={postagem}
        onChangeText={(texto) => {
          setPostagem(texto);

          if (erro && texto.trim()) {
            setErro("");
          }
        }}
        textAlignVertical="top"
      />

      {erro ? (
        <Text style={styles.error}>
          {erro}
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.publishButton}
          onPress={handlePublicar}
        >
          <Text style={styles.publishText}>
            Publicar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#FFF",
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },

  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  inputError: {
    borderColor: "#FF4D4F",
  },

  error: {
    color: "#FF4D4F",
    marginTop: 8,
    fontSize: 14,
  },

  buttonContainer: {
    alignItems: "flex-end",
    marginTop: 12,
  },

  publishButton: {
    backgroundColor: "#1D9E75",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },

  publishText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
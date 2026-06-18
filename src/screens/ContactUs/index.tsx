import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  Alert, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function ContactUs() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const { currentTheme } = useTheme();

  // Definição dinâmica de cores com base no tema ativo
  const isDark = currentTheme === 'dark';
  const themeColors = {
    background: isDark ? '#15151a' : '#f3f4f6',
    cardBg: isDark ? '#1e1e24' : '#ffffff',
    inputBg: isDark ? '#15151a' : '#f9fafb',
    border: isDark ? '#2e2e38' : '#e5e7eb',
    text: isDark ? '#ffffff' : '#111827',
    subText: isDark ? '#9ca3af' : '#4b5563',
    placeholder: isDark ? '#6b7280' : '#9ca3af',
  };

  function enviarMensagem() {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    Alert.alert(
      "Mensagem enviada!",
      `Obrigado pelo contacto, ${nome.trim()}. A nossa equipa responderá em breve.`
    );

    // Limpa os campos após o envio com sucesso
    setNome("");
    setEmail("");
    setMensagem("");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={[styles.screen, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }]}>
          <Text style={[styles.titulo, { color: themeColors.text }]}>Fale Conosco</Text>
          <Text style={[styles.subtitulo, { color: themeColors.subText }]}>
            Tem alguma dúvida ou sugestão sobre o catálogo? Envie-nos uma mensagem!
          </Text>

          {/* CAMPO: NOME */}
          <Text style={[styles.label, { color: themeColors.text }]}>Nome</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBg, borderColor: themeColors.border, color: themeColors.text }]}
            placeholder="Digite o seu nome"
            placeholderTextColor={themeColors.placeholder}
            value={nome}
            onChangeText={setNome}
          />

          {/* CAMPO: E-MAIL */}
          <Text style={[styles.label, { color: themeColors.text }]}>E-mail</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.inputBg, borderColor: themeColors.border, color: themeColors.text }]}
            placeholder="Digite o seu e-mail"
            placeholderTextColor={themeColors.placeholder}
            keyboardType="email-address" 
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* CAMPO: MENSAGEM */}
          <Text style={[styles.label, { color: themeColors.text }]}>Mensagem</Text>
          <TextInput
            style={[
              styles.input, 
              styles.mensagem, 
              { backgroundColor: themeColors.inputBg, borderColor: themeColors.border, color: themeColors.text }
            ]}
            placeholder="Escreva aqui a sua mensagem..."
            placeholderTextColor={themeColors.placeholder}
            value={mensagem}
            onChangeText={setMensagem}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top" // Garante alinhamento correto no Android
          />

          {/* BOTÃO DE SUBMISSÃO */}
          <Pressable style={styles.botao} onPress={enviarMensagem}>
            <Text style={styles.botaoTexto}>Enviar Mensagem</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1, 
    borderRadius: 8,
    height: 46,
    marginBottom: 16,        
    paddingHorizontal: 14,
    fontSize: 15,
  },
  mensagem: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },
  botao: {
    backgroundColor: '#e11d48',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
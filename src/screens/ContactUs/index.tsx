import React, { useState } from "react";
import { ScrollView, Text, TextInput, View, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { getStyles } from "./styles"; // ✨ Importando nossa fábrica de estilos isolados

export default function ContactUs() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const { currentTheme } = useTheme();

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

  // ✨ Gerando os estilos enxutos passando o tema em tempo de execução
  const styles = getStyles(themeColors);

  function handleSendMessage() {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    // Simulação de envio com sucesso
    Alert.alert("Mensagem Enviada!", `Obrigado pelo contacto, ${nome.trim()}! Nossa equipa responderá em breve.`);
    setNome("");
    setEmail("");
    setMensagem("");
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          
          <Text style={styles.titulo}>Fale Conosco 📬</Text>
          <Text style={styles.subtitulo}>Tem alguma dúvida, crítica ou sugestão? Envie-nos uma mensagem!</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor={themeColors.placeholder}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor={themeColors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Mensagem</Text>
          <TextInput
            style={styles.inputMultiline}
            placeholder="Escreva sua mensagem aqui..."
            placeholderTextColor={themeColors.placeholder}
            multiline
            numberOfLines={5}
            value={mensagem}
            onChangeText={setMensagem}
          />

          <Pressable style={styles.botaoEnviar} onPress={handleSendMessage}>
            <Text style={styles.botaoTexto}>Enviar Mensagem</Text>
          </Pressable>

          <View style={styles.infoSuporte}>
            <Text style={styles.infoTexto}>Suporte directo: suporte@cinemaapp.com</Text>
            <Text style={styles.infoTexto}>Resposta em até 24 horas úteis.</Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
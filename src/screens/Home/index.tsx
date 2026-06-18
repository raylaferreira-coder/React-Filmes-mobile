import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

// Tipagem básica para o objeto de navegação do React Navigation
interface HomeProps {
  navigation: any; 
}

export default function Home({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cinema App 🎬</Text>
      <Text style={styles.subtitulo}>Bem-vindo ao catálogo de filmes!</Text>

      {/* Botão que dispara a ação de ir para a tela de Contato */}
      <Pressable 
        style={styles.botao} 
        onPress={() => navigation.navigate("ContactUs")}
      >
        <Text style={styles.textoBotao}>Ir para Fale Conosco</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15151a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 30,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#e11d48',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
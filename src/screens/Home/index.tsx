import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../@types/Navigation";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  // Usando o hook de navegação com a nossa tipagem estrita global
  const navigation = useNavigation<NavigationProp>();
  
  // Consumindo os estados globais de tema e autenticação
  const { currentTheme } = useTheme();
  const { user } = useAuth();

  // Definição dinâmica de cores para suporte a Dark/Light mode
  const isDark = currentTheme === 'dark';
  const themeColors = {
    background: isDark ? '#15151a' : '#f3f4f6',
    text: isDark ? '#ffffff' : '#111827',
    subText: isDark ? '#9ca3af' : '#4b5563',
    buttonSecundario: isDark ? '#2e2e38' : '#e5e7eb',
    textSecundario: isDark ? '#ffffff' : '#374151',
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      
      <Text style={[styles.titulo, { color: themeColors.text }]}>
        Cinema App 🎬
      </Text>
      
      {/* Exibe o nome do utilizador de forma segura obtido da "API" de Login */}
      <Text style={[styles.subtitulo, { color: themeColors.subText }]}>
        Olá, {user?.name || "Utilizador"}! Bem-vindo ao catálogo de filmes.
      </Text>

      {/* Menu de Opções de Navegação */}
      <View style={styles.menuGrid}>
        
        <Pressable 
          style={[styles.botao, { backgroundColor: '#e11d48' }]} 
          onPress={() => navigation.navigate("PostFeed")}
        >
          <Text style={styles.textoBotaoPrincipal}>Ver Feed de Filmes 🍿</Text>
        </Pressable>

        <Pressable 
          style={[styles.botao, { backgroundColor: themeColors.buttonSecundario }]} 
          onPress={() => navigation.navigate("About")}
        >
          <Text style={[styles.textoBotao, { color: themeColors.textSecundario }]}>
            Sobre o Projeto
          </Text>
        </Pressable>

        <Pressable 
          style={[styles.botao, { backgroundColor: themeColors.buttonSecundario }]} 
          onPress={() => navigation.navigate("ContactUs")}
        >
          <Text style={[styles.textoBotao, { color: themeColors.textSecundario }]}>
            Fale Conosco
          </Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  menuGrid: {
    width: "100%",
    maxWidth: 320,
    gap: 14,
  },
  botao: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textoBotaoPrincipal: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoBotao: {
    fontSize: 15,
    fontWeight: '600',
  },
});
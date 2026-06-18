import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

// Tipagem explícita do array para evitar inferências incorretas no modo estrito
const TECHNOLOGIES: string[] = [
  "React Native",
  "React Navigation v7",
  "TypeScript (Strict Mode)",
  "Context API",
  "AsyncStorage",
];

export default function About() {
  const { currentTheme } = useTheme();

  // Configuração dinâmica de cores de acordo com o tema ativo
  const isDark = currentTheme === 'dark';
  const themeColors = {
    background: isDark ? '#15151a' : '#f3f4f6',
    cardBg: isDark ? '#1e1e24' : '#ffffff',
    border: isDark ? '#2e2e38' : '#e5e7eb',
    text: isDark ? '#ffffff' : '#111827',
    subText: isDark ? '#9ca3af' : '#4b5563',
    techTagBg: isDark ? '#2e2e38' : '#e5e7eb',
    techTagText: isDark ? '#ffffff' : '#374151',
  };

  return (
    <ScrollView 
      style={[styles.screen, { backgroundColor: themeColors.background }]} 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>
        Sobre o React Filmes 🎬
      </Text>

      <Text style={[styles.text, { color: themeColors.subText }]}>
        O React Filmes é uma aplicação robusta desenvolvida para explorar informações
        sobre produções cinematográficas, permitindo que o utilizador navegue por títulos 
        populares e aceda a detalhes completos de cada obra.
      </Text>

      <Text style={[styles.text, { color: themeColors.subText }]}>
        Este projeto foi reestruturado seguindo as melhores práticas de arquitetura, 
        utilizando TypeScript estrito, Context API para gestão global de estados e 
        persistência de dados local com AsyncStorage.
      </Text>

      {/* Contentor do Logótipo da API externa */}
      <View style={[styles.logoContainer, { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }]}>
        <Image 
          source={require("../../../assets/tmdblogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.logoText, { color: themeColors.subText }]}>
          Dados demonstrativos fornecidos pela API TMDB (The Movie Database). 
          Aplicação desenvolvida exclusivamente para fins académicos e de aprendizagem prática.
        </Text>
      </View>

      {/* Secção de Tecnologias Utilizadas */}
      <View style={[styles.previewBox, { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }]}>
        <Text style={[styles.previewBoxTitle, { color: themeColors.text }]}>
          Tecnologias e Conceitos Aplicados
        </Text>

        <View style={styles.techGrid}>
          {TECHNOLOGIES.map((tech) => (
            <View key={tech} style={[styles.techTag, { backgroundColor: themeColors.techTagBg }]}>
              <Text style={[styles.techTagText, { color: themeColors.techTagText }]}>
                {tech}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "justify",
  },
  logoContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 12,
  },
  logoText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  previewBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  previewBoxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 14,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  techTagText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
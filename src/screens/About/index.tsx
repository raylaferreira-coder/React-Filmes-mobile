
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const TECHNOLOGIES = [
  "React Native",
  "React Navigation",
  "TypeScript",
  "StyleSheet API",
  "API TMDB",
];

export default function About(){
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o React Filmes</Text>

      <Text style={styles.text}>
        O React Filmes é uma aplicação desenvolvida para explorar informações
        sobre filmes, permitindo que o usuário navegue por títulos populares e
        acesse detalhes de cada produção.
      </Text>

      <Text style={styles.text}>
        Este projeto foi criado como atividade prática de Desenvolvimento de
        Aplicações Multiplataforma, pelos alunos Kevin, Patrick, Rayla, Simone
        e Thiago Rocha, utilizando React, rotas, componentes e consumo de API.
      </Text>

      <View style={styles.logoContainer}>
        <Image source={require("../../../assets/tmdblogo.png")}
        style={styles.logo}/>

        <Text style={styles.logoText}>
          Dados fornecidos pela API TMDB (The Movie Database). Não usado para
          fins comerciais, apenas para aprendizado e prática de
          desenvolvimento.
        </Text>
      </View>

      <View style={styles.previewBox}>
        <Text style={styles.previewBoxTitle}>Tecnologias utilizadas</Text>

        {TECHNOLOGIES.map((tech) => (
          <View key={tech} style={styles.listItem}>
            <Text style={styles.bullet}>▪</Text>
            <Text style={styles.listItemText}>{tech}</Text>
          </View>
        ))}
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
    maxWidth: 400,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
    color: "#1a1a1a",
  },
  logoContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: 30,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  logo: {
    width: 300,
    height: 80,
    marginBottom: 15,
    borderRadius:10 
  },
  logoText: {
    fontSize: 13,
    textAlign: "center",
    opacity: 0.8,
    maxWidth: "80%",
    color: "#1a1a1a",
  },
  previewBox: {
    marginTop: 30,
    padding: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#0070f3",
    backgroundColor: "rgba(0, 112, 243, 0.05)",
    borderRadius: 8,
  },
  previewBoxTitle: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: "#1a1a1a",
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#1a1a1a",
  },
});
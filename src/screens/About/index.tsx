import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import { getStyles } from "./styles";

export default function About() {
  const { currentTheme } = useTheme();

  const isDark = currentTheme === 'dark';
  const themeColors = {
    background: isDark ? '#15151a' : '#f3f4f6',
    cardBg: isDark ? '#1e1e24' : '#ffffff',
    border: isDark ? '#2e2e38' : '#e5e7eb',
    text: isDark ? '#ffffff' : '#111827',
    subText: isDark ? '#9ca3af' : '#4b5563',
  };

  const styles = getStyles(themeColors);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          
          <Text style={styles.titulo}>Sobre o Projeto 🎬</Text>
          
          <Text style={styles.paragrafo}>
            Este aplicativo foi desenvolvido como parte de um ecossistema multiplataforma moderno utilizando 
            <Text style={styles.destaque}> React Native</Text>, <Text style={styles.destaque}> Expo</Text> e 
            <Text style={styles.destaque}> TypeScript</Text>.
          </Text>

          <Text style={styles.paragrafo}>
            O objetivo principal é oferecer um catálogo interativo de cinema onde os utilizadores podem navegar por filmes, 
            interagir com a comunidade através de um feed integrado a uma API assíncrona (CRUD completo) 
            e usufruir de uma interface customizável com suporte dinâmico a temas claro e escuro.
          </Text>

          <Text style={styles.subtitulo}>Conceitos e Tecnologias Aplicados:</Text>
          
          <Text style={styles.itemLista}>• Componentização Avançada e Arquitetura Limpa</Text>
          <Text style={styles.itemLista}>• Gerenciamento Globais de Estado com Context API (Auth e Theme)</Text>
          <Text style={styles.itemLista}>• Navegação Híbrida Segura (Stack e Drawer Navigation)</Text>
          <Text style={styles.itemLista}>• Consumo de API RESTful utilizando Axios</Text>
          <Text style={styles.itemLista}>• Persistência Local e Regras de Negócio Invertidas</Text>

          <Text style={styles.footer}>Versão 1.0.0 • Desenvolvido com 💚</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
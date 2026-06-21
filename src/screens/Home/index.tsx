import React, { useState } from "react";
import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../@types/Navigation";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { getStyles } from "./styles";
import MovieGrid from "../../components/MovieGrid";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<NavigationProp>();
  const { currentTheme } = useTheme();
  const { user } = useAuth();

  const isDark = currentTheme === 'dark';
  const themeColors = {
    background: isDark ? '#15151a' : '#f3f4f6',
    cardBg: isDark ? '#1e1e24' : '#ffffff',
    border: isDark ? '#2e2e38' : '#e5e7eb',
    text: isDark ? '#ffffff' : '#111827',
    subText: isDark ? '#9ca3af' : '#4b5563',
    placeholder: isDark ? '#6b7280' : '#9ca3af',
    primary: '#1d9e75',
  };

  const styles = getStyles(themeColors);

  const getPrimeiroNome = (nomeCompleto: string) => {
    if (!nomeCompleto) return "Utilizador";
    return nomeCompleto.split(" ")[0];
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.saudacao}>Olá, {getPrimeiroNome(user?.name || "")}! 👋</Text>
            <Text style={styles.subSaudacao}>Bem-vindo de volta ao seu espaço de cinema.</Text>
          </View>
        </View>

        <View style={{ marginBottom: 24 }}>
          <TextInput
            style={{
              height: 46,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 16,
              fontSize: 15,
              backgroundColor: themeColors.cardBg,
              borderColor: themeColors.border,
              color: themeColors.text
            }}
            placeholder="Pesquisar filmes no TMDB..."
            placeholderTextColor={themeColors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.bannerDestaque}>
          <View style={styles.tagDestaque}>
            <Text style={styles.tagTexto}>EM DESTAQUE</Text>
          </View>
          <Text style={styles.tituloDestaque}>Duna: Parte Dois 🪐</Text>
          <Text style={styles.textoDestaque}>
            A comunidade está ativa a debater o mais recente sucesso de ficção científica. 
            Visite o Feed para ler as críticas e deixar a sua nota!
          </Text>
        </View>

        <Text style={styles.seccaoTitulo}>Navegação Rápida</Text>
        
        <View style={styles.grelhaAcoes}>
          
          <Pressable style={styles.cartaoAcao} onPress={() => navigation.navigate("Feed")}>
            <MaterialIcons name="forum" size={32} style={styles.iconeAcao} />
            <Text style={styles.textoAcao}>Feed da Comunidade</Text>
          </Pressable>

          <Pressable style={styles.cartaoAcao} onPress={() => navigation.navigate("About")}>
            <MaterialIcons name="info" size={32} style={styles.iconeAcao} />
            <Text style={styles.textoAcao}>Sobre o App</Text>
          </Pressable>

          <Pressable style={styles.cartaoAcao} onPress={() => navigation.navigate("ContactUs")}>
            <MaterialIcons name="mail" size={32} style={styles.iconeAcao} />
            <Text style={styles.textoAcao}>Fale Conosco</Text>
          </Pressable>

          <Pressable style={styles.cartaoAcao} onPress={() => navigation.navigate("Feed")}>
            <MaterialIcons name="movie" size={32} style={styles.iconeAcao} />
            <Text style={styles.textoAcao}>Filmes Votados</Text>
          </Pressable>

        </View>

        <Text style={[styles.seccaoTitulo, { marginTop: 32, marginBottom: 4 }]}>
          {searchQuery ? "Resultados da Busca" : "Filmes Populares"}
        </Text>
        
        <MovieGrid query={searchQuery} />

      </ScrollView>
    </SafeAreaView>
  );
}
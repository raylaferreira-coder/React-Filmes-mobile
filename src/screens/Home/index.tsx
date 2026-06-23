import React, { useState, useEffect } from "react";
import { Text, View, Pressable, TextInput, ActivityIndicator,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../@types/Navigation";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { getStyles } from "./styles";
import MovieGrid from "../../components/MovieGrid";
import { MaterialIcons } from "@expo/vector-icons";
import apiFilmes from "../../data/apiFilmes"; 

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filmeDestaque, setFilmeDestaque] = useState<any>(null);
  const [textoBusca, setTextoBusca] = useState("");
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

  useEffect(() => {
    async function carregarDestaque() {
      try {
        const response = await apiFilmes.get("/movie/now_playing");
        if (response.data.results && response.data.results.length > 0) {
          setFilmeDestaque(response.data.results[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar destaque:", error);
      }
    }
    carregarDestaque();
  }, []);

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.saudacao}>Olá, {user?.name?.split(" ")[0] || "Utilizador"}! 👋</Text>
      </View>

      <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: themeColors.cardBg,
    borderColor: themeColors.border,
    paddingHorizontal: 10,
  }}>

    <TextInput
  style={{
    flex: 1,
    height: 46,
    color: themeColors.text,
  }}
  placeholder="Pesquisar filmes..."
  placeholderTextColor={themeColors.placeholder}
  value={textoBusca}
  onChangeText={(texto) => {
    setTextoBusca(texto);

    if (texto.trim() === "") {
      setSearchQuery("");
    }
  }}
  />

  <TouchableOpacity
    onPress={() => setSearchQuery(textoBusca)}
  >
    <MaterialIcons
      name="search"
      size={22}
      color={themeColors.primary}
    />
  </TouchableOpacity>
</View>

      {/* Banner Dinâmico */}
      {filmeDestaque ? (
        <Pressable 
          style={styles.bannerDestaque} 
          onPress={() => navigation.navigate("Feed", { id: filmeDestaque.id })}
        >
          <View style={styles.tagDestaque}>
            <Text style={styles.tagTexto}>EM DESTAQUE</Text>
          </View>
          <Text style={styles.tituloDestaque} numberOfLines={1}>{filmeDestaque.title}</Text>
          <Text style={styles.textoDestaque} numberOfLines={3}>
            {filmeDestaque.overview || "Sem descrição disponível."}
          </Text>
        </Pressable>
      ) : (
        <View style={[styles.bannerDestaque, { alignItems: 'center', justifyContent: 'center' }]}>
          <ActivityIndicator color={themeColors.primary} />
        </View>
      )}

      <Text style={styles.seccaoTitulo}>Navegação Rápida</Text>
      <View style={styles.grelhaAcoes}>
        <Pressable style={styles.cartaoAcao} onPress={() => navigation.navigate("ContactUs")}><MaterialIcons name="mail" size={32} style={styles.iconeAcao} /><Text style={styles.textoAcao}>Contato</Text></Pressable>
        <Pressable style={styles.cartaoAcao} onPress={() => navigation.navigate("About")}><MaterialIcons name="info" size={32} style={styles.iconeAcao} /><Text style={styles.textoAcao}>Sobre</Text></Pressable>
        {/* <Pressable style={styles.cartaoAcao} onPress={() => navigation.navigate("Feed")}><MaterialIcons name="movie" size={32} style={styles.iconeAcao} /><Text style={styles.textoAcao}>Ultimo Visto</Text></Pressable> */}
        {/* <Pressable style={styles.cartaoAcao} onPress={() => navigation.navigate("Feed")}><MaterialIcons name="forum" size={32} style={styles.iconeAcao} /><Text style={styles.textoAcao}>Feed</Text></Pressable> */}
      </View>

      <Text style={[styles.seccaoTitulo, { marginTop: 32 }]}>
        {searchQuery ? "Resultados da Busca" : "Filmes Populares"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }} edges={['bottom', 'left', 'right']}>
      <MovieGrid 
        query={searchQuery} 
        ListHeaderComponent={renderHeader()} 
        contentContainerStyle={{ padding: 24 }}
      />
    </SafeAreaView>
  );
}
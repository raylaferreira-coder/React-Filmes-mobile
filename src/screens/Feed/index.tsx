import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Recomendado para gerenciar safe area
import { useTheme } from "../../contexts/ThemeContext"; 
import { useAuth } from "../../contexts/AuthContext";
import api from "../../data/api";
import apiFilmes from "../../data/apiFilmes";
import { getStyles } from "./styles";
import FeedInput from "./FeedInput";

export default function Feed({ route }: any) {
  const { id: filmeId } = route.params || {};
  const [comment, setComment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dadosFilme, setDadosFilme] = useState<any>(null);

  const { currentTheme } = useTheme(); 
  const isLight = currentTheme === "light";

  const colors = {
    background: isLight ? "#f5f5f5" : "#121212",
    cardBg: isLight ? "#ffffff" : "#1e1e1e",
    border: isLight ? "rgba(128, 128, 128, 0.15)" : "rgba(255, 255, 255, 0.1)",
    text: isLight ? "#333333" : "#ffffff",
    subText: isLight ? "#777777" : "#aaaaaa",
    inputBg: isLight ? "#ffffff" : "#2a2a2a",
    primary: "#1d9e75", 
    likeActive: "#e91e63", 
  };

  const styles = getStyles(colors);

  useEffect(() => {
    async function carregar() {
      if (!filmeId) { setLoading(false); return; }
      try {
        const [f, c] = await Promise.all([
          apiFilmes.get(`/movie/${filmeId}`), 
          api.get(`/comentario/filme/${filmeId}`)
        ]);
        setDadosFilme(f.data);
        setComment(c.data);
      } catch (e) { Alert.alert("Erro", "Falha ao carregar dados."); } 
      finally { setLoading(false); }
    }
    carregar();
  }, [filmeId]);

  const renderHeader = () => {
    if (!dadosFilme) return null;
    return (
      <View>
        <View style={styles.movieSection}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${dadosFilme.poster_path}` }} style={styles.poster} />
          <Text style={styles.tituloFilme}>{dadosFilme.title}</Text>
          <Text style={styles.sinopseFilme}>{dadosFilme.overview}</Text>
        </View>

        <FeedInput 
          filmeId={filmeId} 
          colors={colors} 
          styles={styles} 
          onPostPublicado={(novoPost: any) => setComment((prev) => [novoPost, ...prev])} 
        />

        <View style={styles.divisor} />
        <Text style={styles.tituloSessao}>Comunidade</Text>
      </View>
    );
  };

  return (
    // SafeAreaView garante que o conteúdo respeite as margens do sistema
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={comment}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer} // Aplica padding correto definido em styles
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.authorName}>{item.nome}</Text>
              <Text style={styles.postContent}>{item.postagem}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
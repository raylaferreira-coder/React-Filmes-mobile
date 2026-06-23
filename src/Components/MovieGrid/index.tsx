// este aqui é o antigo card

import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import apiFilmes from "../../data/apiFilmes";
import { getStyles } from "./styles";

interface Filme {
  id: number;
  title: string;
  poster_path: string | null;
}

interface CardProps {
  query: string | null;
  ListHeaderComponent?: React.ReactElement;
  contentContainerStyle?: any;
}

export default function MovieGrid({ query, ListHeaderComponent, contentContainerStyle }: CardProps) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  
  const numColumns = width < 400 ? 1 : 2;
  const navigation = useNavigation<any>();
  const { currentTheme } = useTheme();
  const isLight = currentTheme === "light";

  const colors = {
    background: isLight ? "#f5f5f5" : "#121212",
    cardBg: isLight ? "#ffffff" : "#1e1e1e",
    border: isLight ? "rgba(128, 128, 128, 0.15)" : "rgba(255, 255, 255, 0.08)",
    text: isLight ? "#333333" : "#ffffff",
    semFotoBg: isLight ? "#cccccc" : "#333333",
    primary: "#1d9e75",
  };

  const styles = getStyles(colors);

  useEffect(() => {
    let ativo = true;
    async function carregarFilmes() {
      setLoading(true);
      try {
        const buscando = query && query.trim() !== "";
        const response = await apiFilmes.get(buscando ? "/search/movie" : "/movie/popular", {
          params: buscando ? { query: query!.trim(), page: 1 } : { page: 1 },
        });
        if (ativo) setFilmes(response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        if (ativo) setLoading(false);
      }
    }
    carregarFilmes();
    return () => { ativo = false; };
  }, [query]);

  if (loading) return <View style={styles.statusContainer}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <FlatList
      data={filmes}
      key={numColumns.toString()}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={contentContainerStyle || styles.galeria}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, { width: numColumns === 1 ? '100%' : styles.card.width }]}
          onPress={() => navigation.navigate("Feed", { id: item.id })}
          activeOpacity={0.8}
        >
          <Text style={styles.titulo} numberOfLines={2}>{item.title}</Text>
          {item.poster_path ? (
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
          ) : (
            <View style={styles.semFoto}><Text style={styles.semFotoTexto}>Sem Imagem</Text></View>
          )}
        </TouchableOpacity>
      )}
    />
  );
}
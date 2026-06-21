// este aqui é o antigo card

import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import apiFilmes from "../../data/apiFilmes";
import { getStyles, NUM_COLUNAS, ESPACAMENTO } from "./styles";

interface Filme {
  id: number;
  title: string;
  poster_path: string | null;
}

interface CardProps {
  query: string | null;
}

export default function MovieGrid({ query }: CardProps) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [semResultado, setSemResultado] = useState(false);

  let navigation: any = null;
  try {
    navigation = useNavigation<any>();
  } catch (e) {
    navigation = null;
  }

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
      setSemResultado(false);

      try {
        let resultados: Filme[] = [];
        const buscando = query && query.trim() !== "";

        if (buscando) {
          const response = await apiFilmes.get("/search/movie", {
            params: { query: query!.trim(), page: 1 },
          });
          resultados = response.data.results || [];
        } else {
          const response = await apiFilmes.get("/movie/popular", {
            params: { page: 1 },
          });
          resultados = response.data.results || [];
        }

        if (ativo) {
          setFilmes(resultados);
          setSemResultado(resultados.length === 0);
        }
      } catch (error: any) {
        console.log("Erro ao carregar filmes:", error.message);
        if (ativo) setSemResultado(true);
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarFilmes();
    return () => {
      ativo = false;
    };
  }, [query]);

  function abrirFilme(id: number) {
    if (navigation) {
      navigation.navigate("Feed", { id });
    } else {
      console.log("Navegação indisponível neste teste. Filme tocado:", id);
    }
  }

  if (loading) {
    return (
      <View style={styles.statusContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.statusText}>Carregando filmes...</Text>
      </View>
    );
  }

  if (semResultado) {
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Nenhum filme encontrado{query ? ` para "${query}"` : ""}.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filmes}
      keyExtractor={(item) => item.id.toString()}
      numColumns={NUM_COLUNAS}
      scrollEnabled={false} // evitando quebra do scrol
      contentContainerStyle={styles.galeria}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => abrirFilme(item.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.titulo} numberOfLines={2}>
            {item.title}
          </Text>
          
          {item.poster_path ? (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
          ) : (
            <View style={styles.semFoto}>
              <Text style={styles.semFotoTexto}>Sem Imagem</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    />
  );
}
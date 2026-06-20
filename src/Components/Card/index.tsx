import React, { useEffect, useState } from "react";
import {View,Text,Image,TouchableOpacity,FlatList,StyleSheet,ActivityIndicator,Dimensions,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import apiFilmes from "../../data/apiFilmes";

interface Filme {
  id: number;
  title: string;
  poster_path: string | null;
}

interface CardProps {
  query: string | null;
}

const { width } = Dimensions.get("window");
const NUM_COLUNAS = 2;
const ESPACAMENTO = 16;
const LARGURA_CARD = (width - ESPACAMENTO * (NUM_COLUNAS + 1)) / NUM_COLUNAS;

export default function Card({ query }: CardProps) {
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
    border: isLight ? "rgba(128, 128, 128, 0.2)" : "rgba(255, 255, 255, 0.1)",
    text: isLight ? "#333333" : "#ffffff",
    semFotoBg: isLight ? "#cccccc" : "#333333",
    primary: "#1d9e75",
  };

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
      <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.statusText, { color: colors.text }]}>Carregando filmes...</Text>
      </View>
    );
  }

  if (semResultado) {
    return (
      <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.statusText, { color: colors.text }]}>
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
      contentContainerStyle={styles.galeria}
      columnWrapperStyle={{ gap: ESPACAMENTO }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: colors.cardBg, borderColor: colors.border, width: LARGURA_CARD },
          ]}
          onPress={() => abrirFilme(item.id)}
          activeOpacity={0.8}
        >
          <Text style={[styles.titulo, { color: colors.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          {item.poster_path ? (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={[styles.poster, { width: LARGURA_CARD - 24 }]}
            />
          ) : (
            <View
              style={[
                styles.semFoto,
                { width: LARGURA_CARD - 24, backgroundColor: colors.semFotoBg },
              ]}
            >
              <Text style={{ color: colors.text, fontWeight: "bold" }}>Sem Imagem</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  statusText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  galeria: {
    padding: ESPACAMENTO,
    gap: ESPACAMENTO,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: ESPACAMENTO,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    minHeight: 36,
  },
  poster: {
    aspectRatio: 2 / 3,
    borderRadius: 6,
    resizeMode: "cover",
  },
  semFoto: {
    aspectRatio: 2 / 3,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
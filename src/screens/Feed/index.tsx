import React, { useEffect, useState } from "react";
import {  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEditado, setTextoEditado] = useState("");

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

  async function excluirComentario(id: number) {
  Alert.alert(
    "Excluir comentário",
    "Tem certeza que deseja excluir este comentário?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/comentario/${id}`);

            setComment((prev) =>
              prev.filter((comentario) => comentario.id !== id)
            );
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]
  );
} 

async function atualizarComentario(id: number) {
  try {
    const comentarioOriginal = comment.find(
      (item) => item.id === id
    );

    if (!comentarioOriginal) {
      Alert.alert("Erro", "Comentário não encontrado.");
      return;
    }

    // Exclui o comentário antigo
    await api.delete(`/comentario/${id}`);

    // Cria um novo comentário
    const response = await api.post("/comentario", {
      nome: comentarioOriginal.nome,
      postagem: textoEditado,
      dataPostagem: new Date().toISOString(),
      filmeId,
    });

    // Remove o antigo da lista
    setComment((prev) =>
      prev.filter((item) => item.id !== id)
    );

    // Adiciona o novo
    setComment((prev) => [response.data, ...prev]);

    setEditandoId(null);
    setTextoEditado("");

    Alert.alert("Sucesso", "Comentário atualizado.");
  } catch (error) {
    Alert.alert("Erro", "Não foi possível atualizar.");
    console.error(error);
  }
}



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
  
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={comment}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer} 
          renderItem={({ item }) => (
  <View style={styles.postCard}>
    <Text style={styles.authorName}>{item.nome}</Text>

    {editandoId === item.id ? (
      <>
        <TextInput
          style={styles.campoTextoEdicao}
          value={textoEditado}
          onChangeText={setTextoEditado}
          multiline
        />

        <View style={styles.editActionButtons}>
          <TouchableOpacity
            style={styles.btnPublicar}
            onPress={() => atualizarComentario(item.id)}
          >
            <Text style={styles.btnPublicarText}>
              Salvar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnPublicar,
              { backgroundColor: "#777" },
            ]}
            onPress={() => {
              setEditandoId(null);
              setTextoEditado("");
            }}
          >
            <Text style={styles.btnPublicarText}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <>
        <Text style={styles.postContent}>
          {item.postagem}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 15,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setEditandoId(item.id);
              setTextoEditado(item.postagem);
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => excluirComentario(item.id)}
          >
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              Excluir
            </Text>
          </TouchableOpacity>
        </View>
      </>
    )}
  </View>
)}
        />
      )}
    </SafeAreaView>
  );
}
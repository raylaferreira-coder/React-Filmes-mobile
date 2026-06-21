import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  TextInput,
  Alert
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign"; 
import FontAwesome from "@expo/vector-icons/FontAwesome"; 
import { useTheme } from "../../contexts/ThemeContext"; 
import { useAuth } from "../../contexts/AuthContext";
import api from "../../data/api";
import { getStyles } from "./styles";
import apiFilmes from "../../data/apiFilmes";

interface PostItem {
  id: number;
  nome: string;
  avatarUrl?: string;
  dataPostagem: string;
  postagem: string;
  like: number;
}

export default function Feed({ route, navigation }) {

  const { id: filmeId }= route.params || {};
  
  const [comment, setComment] = useState<PostItem[]>([]);
  const [likedId, setLikedId] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [novoComentario, setNovoComentario] = useState("");
  const [dadosFilme, setDadosFilme] = useState<any>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  const { currentTheme } = useTheme(); 
  const { user } = useAuth();
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

  
     const carregarDadosDoFeed = async () => {
  if (!filmeId || filmeId === "undefined") {
    setLoading(false);
    return;
  }

  setLoading(true);

  try {
    const [filmeResponse, comentariosResponse] = await Promise.all([
      apiFilmes.get(`/movie/${filmeId}`),
   
      api.get(`/comentario/filme/${filmeId}`) 
    ]);

    setDadosFilme(filmeResponse.data);
    setComment(comentariosResponse.data);
  } catch (err) {
    console.error("Erro ao carregar dados do feed:", err);
    Alert.alert("Erro", "Não foi possível carregar os dados deste filme.");
  } finally {
    setLoading(false); 
  }
};

  useEffect(() => {
    carregarDadosDoFeed();
  }, [filmeId]);

  function handleCreatePost() {
    if (!novoComentario.trim()) return;

    const payload = {
      nome: user?.email || "Usuário", 
      postagem: novoComentario.trim(),
      dataPostagem: new Date().toISOString(),
      like: 0,
      filmeId: filmeId
    };

    api.post("/comentario", payload)
      .then((response) => {
        setComment((prev) => [response.data, ...prev]);
        setNovoComentario("");
      })
      .catch((err) => console.log("Erro ao publicar", err));
  }

  function handleUpdatePost(id: number) {
    if (!textoEdicao.trim()) return;

    const comentarioOriginal = comment.find((item) => item.id === id);
    if (!comentarioOriginal) return;

    const payload = {
      ...comentarioOriginal,
      postagem: textoEdicao.trim()
    };

    api.put(`/comentario/${id}`, payload)
      .then((response) => {
        setComment((prev) => prev.map((item) => item.id === id ? response.data : item));
        setEditingId(null);
        setTextoEdicao("");
        Alert.alert("Sucesso", "Comentário atualizado!");
      })
      .catch((err) => console.log("Erro ao editar", err));
  }

  function deleteComent(id: number) {
    api
      .delete(`/comentario/${id}`)
      .then(() => {
        setComment((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.log("Erro ao deletar", err));
  }

  function like(id: number) {
    setLikedId((prop) => {
      const proximo = new Set(prop);
      proximo.has(id) ? proximo.delete(id) : proximo.add(id);
      return proximo;
    });
  }

  function getInitials(name: string) {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length > 1 && parts[1][0]) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  }

  const renderHeader = () => {
    if (!dadosFilme) return null;

    
    const posterUri = dadosFilme.poster_path 
      ? `https://image.tmdb.org/t/p/w500${dadosFilme.poster_path}`
      : dadosFilme.posterUrl || "https://via.placeholder.com/500";

    return (
      <View>
        <View style={styles.movieSection}>
          <Image source={{ uri: posterUri }} style={styles.poster} />
          <Text style={styles.tituloFilme}>{dadosFilme.title || dadosFilme.nome || dadosFilme.titulo}</Text>
          <Text style={styles.notaFilme}>★ {(dadosFilme.vote_average || dadosFilme.nota || 0).toFixed(1)} / 10</Text>
          <Text style={styles.sinopseFilme}>{dadosFilme.overview || dadosFilme.sinopse}</Text>
        </View>

        <View style={styles.caixaCriarPost}>
          <Text style={styles.createPostTitle}>Compartilhe sua opinião</Text>
          <TextInput
            style={styles.campoTexto}
            placeholder="O que você achou desse filme?..."
            placeholderTextColor={colors.subText}
            multiline
            value={novoComentario}
            onChangeText={setNovoComentario}
          />
          <View style={styles.botoesForm}>
            <TouchableOpacity style={styles.btnPublicar} onPress={handleCreatePost}>
              <Text style={styles.btnPublicarText}>Publicar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divisor} />
        <Text style={styles.tituloSessao}>Comunidade</Text>
        {comment.length === 0 && (
          <Text style={styles.semComentarios}>Nenhum comentário ainda. Seja o primeiro!</Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={comment}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const liked = likedId.has(item.id);
            const isAuthor = item.nome === user?.email; 
            const isEditing = editingId === item.id;

            return (
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  {item.avatarUrl ? (
                    <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>{getInitials(item.nome)}</Text>
                    </View>
                  )}
                  
                  <View style={{ flex: 1 }}>
                    <Text style={styles.authorName}>{item.nome}</Text>
                    <Text style={styles.postDate}>
                      {item.dataPostagem ? new Date(item.dataPostagem).toLocaleDateString("pt-br") : ""}
                    </Text>
                  </View>

                  {isAuthor && !isEditing && (
                    <View style={styles.authorActions}>
                      <TouchableOpacity onPress={() => { setEditingId(item.id); setTextoEdicao(item.postagem); }}>
                        <FontAwesome name="pencil" color={colors.primary} size={18} style={{ marginRight: 14 }} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteComent(item.id)}>
                        <FontAwesome name="trash-o" color="#ff4d4f" size={18} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {isEditing ? (
                  <View style={{ marginTop: 6 }}>
                    <TextInput
                      style={styles.campoTextoEdicao}
                      value={textoEdicao}
                      onChangeText={setTextoEdicao}
                      multiline
                    />
                    <View style={styles.editActionButtons}>
                      <TouchableOpacity style={[styles.btnPublicar, { paddingVertical: 6 }]} onPress={() => handleUpdatePost(item.id)}>
                        <Text style={styles.btnPublicarText}>Salvar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 8 }} onPress={() => setEditingId(null)}>
                        <Text style={{ color: colors.subText, fontWeight: "600" }}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.postContent}>{item.postagem}</Text>
                )}

                <View style={styles.postActions}>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => like(item.id)}>
                    <AntDesign name="like1" color={liked ? colors.likeActive : colors.subText} size={18} />
                    <Text style={[styles.actionBtnText, { color: liked ? colors.likeActive : colors.subText }]}>
                      {liked ? item.like + 1 : item.like}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
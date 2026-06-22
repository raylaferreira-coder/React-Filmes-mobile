import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  TextInput
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign"; 
import FontAwesome from "@expo/vector-icons/FontAwesome"; 
import { useTheme } from "../../contexts/ThemeContext"; 
import api from "../../data/api";

interface PostItem {
  id: number;
  nome: string;
  avatarUrl?: string;
  dataPostagem: string;
  postagem: string;
  like: number;
}

const MOVIE_DATA = {
  titulo: "Duna: Parte Dois",
  nota: "★ 8.8 / 10",
  sinopse: "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Uma jornada espiritual e marcial se inicia.",
  posterUrl: "https://image.tmdb.org/t/p/w500/z669vGOGE8STg8Y89Ias8n9S57c.jpg"
};

export default function Feed() {
  const [comment, setComment] = useState<PostItem[]>([]);
  const [likedId, setLikedId] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  
  const [novoComentario, setNovoComentario] = useState("");

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

  useEffect(() => {
    api
      .get("/comentario")
      .then((response) => {
        setComment(response.data);
      })
      .catch((error) => {
        console.log("Erro de requisição", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleCreatePost() {
    if (!novoComentario.trim()) return;

    const payload = {
      nome: "Usuário Logado", 
      postagem: novoComentario,
      dataPostagem: new Date().toISOString(),
      like: 0
    };

    api.post("/comentario", payload)
      .then((response) => {
        setComment((prev) => [response.data, ...prev]);
        setNovoComentario("");
      })
      .catch((err) => console.log("Erro ao publicar", err));
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
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }

  const renderHeader = () => (
    <View>
      <View style={[styles.movieSection, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <Image source={{ uri: MOVIE_DATA.posterUrl }} style={styles.poster} />
        <Text style={[styles.tituloFilme, { color: colors.text }]}>{MOVIE_DATA.titulo}</Text>
        <Text style={styles.notaFilme}>{MOVIE_DATA.nota}</Text>
        <Text style={[styles.sinopseFilme, { color: colors.text }]}>{MOVIE_DATA.sinopse}</Text>
      </View>

      <View style={[styles.caixaCriarPost, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <Text style={[styles.createPostTitle, { color: colors.text }]}>Compartilhe sua opinião</Text>
        <TextInput
          style={[styles.campoTexto, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
          placeholder="O que você achou desse filme?..."
          placeholderTextColor={colors.subText}
          multiline
          value={novoComentario}
          onChangeText={setNovoComentario}
        />
        <View style={styles.botoesForm}>
          <TouchableOpacity style={[styles.btnPublicar, { backgroundColor: colors.primary }]} onPress={handleCreatePost}>
            <Text style={styles.btnPublicarText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.divisor, { backgroundColor: colors.border }]} />
      <Text style={[styles.tituloSessao, { color: colors.text }]}>Comunidade</Text>
      {comment.length === 0 && (
        <Text style={[styles.semComentarios, { color: colors.subText }]}>Nenhum comentário ainda. Seja o primeiro!</Text>
      )}
    </View>
  );

  const renderItem = ({ item }: { item: PostItem }) => {
    const liked = likedId.has(item.id);

    return (
      <View style={[styles.postCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <View style={styles.postHeader}>
          {item.avatarUrl ? (
            <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>{getInitials(item.nome)}</Text>
            </View>
          )}
          
          <View style={styles.authorMetaData}>
            <Text style={[styles.authorName, { color: colors.text }]}>{item.nome}</Text>
            <Text style={[styles.postDate, { color: colors.subText }]}>
              {new Date(item.dataPostagem).toLocaleDateString("pt-br")}
            </Text>
          </View>
        </View>

        <Text style={[styles.postContent, { color: colors.text }]}>{item.postagem}</Text>

        <View style={[styles.postActions, { borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => like(item.id)}>
            <AntDesign 
              name="like" 
              color={liked ? colors.likeActive : colors.subText} 
              size={18} 
            />
            <Text style={[styles.actionBtnText, { color: liked ? colors.likeActive : colors.subText }]}>
              {liked ? item.like + 1 : item.like}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteComent(item.id)}>
            <FontAwesome name="trash-o" color="#ff4d4f" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={comment}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader} 
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  movieSection: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  poster: {
    width: "100%",
    height: 380,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 15,
  },
  tituloFilme: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notaFilme: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffc107",
    marginBottom: 10,
  },
  sinopseFilme: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "justify",
  },
  
  caixaCriarPost: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  createPostTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  campoTexto: {
    height: 90,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    textAlignVertical: "top",
    fontSize: 15,
  },
  botoesForm: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  btnPublicar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  btnPublicarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  divisor: {
    height: 1,
    marginVertical: 15,
  },
  tituloSessao: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  semComentarios: {
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
  },

  postCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorMetaData: {
    flexDirection: "column",
  },
  authorName: {
    fontWeight: "600",
    fontSize: 15,
  },
  postDate: {
    fontSize: 12,
    marginTop: 2,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "500",
  },
  deleteBtn: {
    padding: 4,
  },
});
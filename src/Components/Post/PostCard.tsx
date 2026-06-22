import { View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

interface Post {
  id: number;
  nome?: string;
  postagem: string;
  likes: number;
  dataPostagem?: string;
}

interface PostCardProps {
  post: Post;
  liked: boolean;
  likeColor: string;
  likeActiveColor: string;
  getInitials: (nome: string) => string;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PostCard({
  post,
  liked,
  likeColor,
  likeActiveColor,
  getInitials,
  onLike,
  onDelete,
}: PostCardProps) {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const themeColors = {
    cardBg: isDark ? "#1e1e24" : "#ffffff",
    text: isDark ? "#ffffff" : "#111827",
    subText: isDark ? "#9ca3af" : "#666666",
    avatarBg: isDark ? "#0070f3" : "#2563eb",
  };

  return (
    <View style={[styles.card, { backgroundColor: themeColors.cardBg }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: themeColors.avatarBg }]}>
          <Text style={styles.avatarText}>
            {getInitials(post.nome || "User")}
          </Text>
        </View>

        <View style={styles.headerInfo}>
          <Text style={[styles.author, { color: themeColors.text }]}>
            {post.nome || "Anônimo"}
          </Text>

          <Text style={[styles.date, { color: themeColors.subText }]}>
            {post.dataPostagem
              ? new Date(post.dataPostagem).toLocaleDateString("pt-BR")
              : "Agora"}
          </Text>
        </View>
      </View>

      <Text style={[styles.content, { color: themeColors.text }]}>
        {post.postagem}
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={() => onLike(post.id)}>
          <AntDesign
            nome="like1"
            size={18}
            color={liked ? likeActiveColor : likeColor}
          />
          <Text style={{ color: liked ? likeActiveColor : likeColor, fontWeight: '600' }}>
            {liked ? post.likes + 1 : post.likes}
          </Text>
        </Pressable>

        <Pressable onPress={() => onDelete(post.id)} style={styles.deleteButton}>
          <Feather name="trash-2" size={18} color="#ef4444" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 16, // respiro nas laterais
    borderWidth: 1,
    borderColor: 'transparent',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerInfo: {
    flex: 1, // sem empurrar o layout
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
  },
  author: {
    fontWeight: "600",
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  content: {
    marginBottom: 16,
    lineHeight: 22,
    flexWrap: 'wrap', 
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(128,128,128,0.1)',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    padding: 4,
  }
});
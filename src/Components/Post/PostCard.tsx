import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  AntDesign,
  Feather,
} from "@expo/vector-icons";

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
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(post.nome || "User")}
          </Text>
        </View>

        <View>
          <Text style={styles.author}>
            {post.nome || "Anônimo"}
          </Text>

          <Text style={styles.date}>
            {post.dataPostagem
              ? new Date(post.dataPostagem).toLocaleDateString(
                  "pt-BR"
                )
              : "Agora"}
          </Text>
        </View>
      </View>

      <Text style={styles.content}>
        {post.postagem}
      </Text>

      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => onLike(post.id)}
        >
          <AntDesign
            size={18}
            color={
              liked
                ? likeActiveColor
                : likeColor
            }
          />

          <Text
            style={{
              color: liked
                ? likeActiveColor
                : likeColor,
            }}
          >
            {liked
              ? post.likes + 1
              : post.likes}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onDelete(post.id)}
        >
          <Feather
            name="trash-2"
            size={18}
            color="#ef4444"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
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
    color: "#666",
    fontSize: 12,
  },

  content: {
    marginBottom: 16,
    lineHeight: 22,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
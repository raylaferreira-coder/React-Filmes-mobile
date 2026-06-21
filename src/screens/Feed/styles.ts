import { StyleSheet } from "react-native";

interface FeedThemeColors {
  background: string;
  cardBg: string;
  border: string;
  text: string;
  subText: string;
  inputBg: string;
  primary: string;
  likeActive: string;
}

export const getStyles = (colors: FeedThemeColors) => StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  listContainer: { 
    paddingVertical: 20, 
    paddingHorizontal: 15 
  },
  movieSection: { 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    marginBottom: 20,
    backgroundColor: colors.cardBg,
    borderColor: colors.border
  },
  poster: { 
    width: "100%", 
    height: 380, 
    borderRadius: 12, 
    resizeMode: "cover", 
    marginBottom: 15 
  },
  tituloFilme: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 5,
    color: colors.text
  },
  notaFilme: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#ffc107", 
    marginBottom: 10 
  },
  sinopseFilme: { 
    fontSize: 14, 
    lineHeight: 22, 
    textAlign: "justify",
    color: colors.text
  },
  caixaCriarPost: { 
    padding: 20, 
    borderRadius: 12, 
    borderWidth: 1, 
    marginBottom: 20,
    backgroundColor: colors.cardBg,
    borderColor: colors.border
  },
  createPostTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 10,
    color: colors.text
  },
  campoTexto: { 
    height: 90, 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    textAlignVertical: "top", 
    fontSize: 15,
    backgroundColor: colors.inputBg,
    color: colors.text,
    borderColor: colors.border
  },
  campoTextoEdicao: {
    height: 70, 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    textAlignVertical: "top", 
    fontSize: 15,
    backgroundColor: colors.inputBg,
    color: colors.text,
    borderColor: colors.primary,
  },
  botoesForm: { 
    flexDirection: "row", 
    justifyContent: "flex-end", 
    marginTop: 10 
  },
  btnPublicar: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 6,
    backgroundColor: colors.primary
  },
  btnPublicarText: { 
    color: "white", 
    fontWeight: "bold", 
    fontSize: 15 
  },
  divisor: { 
    height: 1, 
    marginVertical: 15,
    backgroundColor: colors.border
  },
  tituloSessao: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 15,
    color: colors.text
  },
  semComentarios: { 
    fontStyle: "italic", 
    textAlign: "center", 
    marginVertical: 10,
    color: colors.subText
  },
  postCard: { 
    borderWidth: 1, 
    borderRadius: 10, 
    padding: 16, 
    marginBottom: 14,
    backgroundColor: colors.cardBg,
    borderColor: colors.border
  },
  postHeader: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 12, 
    marginBottom: 10 
  },
  avatarPlaceholder: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  avatarText: { 
    color: "white", 
    fontWeight: "bold", 
    fontSize: 14 
  },
  avatarImage: { 
    width: 40, 
    height: 40, 
    borderRadius: 20 
  },
  authorName: { 
    fontWeight: "600", 
    fontSize: 15,
    color: colors.text
  },
  postDate: { 
    fontSize: 12, 
    marginTop: 2,
    color: colors.subText
  },
  authorActions: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  postContent: { 
    fontSize: 15, 
    lineHeight: 22, 
    marginBottom: 12, 
    marginTop: 4,
    color: colors.text
  },
  postActions: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    borderTopWidth: 1, 
    paddingTop: 10,
    borderTopColor: colors.border
  },
  actionBtn: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 6 
  },
  actionBtnText: { 
    fontSize: 14, 
    fontWeight: "500" 
  },
  editActionButtons: { 
    flexDirection: "row", 
    gap: 10, 
    justifyContent: "flex-end", 
    marginTop: 8, 
    alignItems: "center" 
  }
});
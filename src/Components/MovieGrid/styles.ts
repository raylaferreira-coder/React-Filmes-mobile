import { StyleSheet, Dimensions } from "react-native";

// Grid expostas se necessário
const { width } = Dimensions.get("window");
export const NUM_COLUNAS = 1;
export const ESPACAMENTO = 16;
export const LARGURA_CARD = (width - ESPACAMENTO * (NUM_COLUNAS + 1)) / NUM_COLUNAS;

interface CardThemeColors {
  background: string;
  cardBg: string;
  border: string;
  text: string;
  semFotoBg: string;
}

export const getStyles = (colors: CardThemeColors) => StyleSheet.create({
  statusContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "500",
    color: colors.text,
  },
  galeria: {
    paddingVertical: ESPACAMENTO,
    gap: ESPACAMENTO,
  },
  columnWrapper: {
    gap: ESPACAMENTO,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: ESPACAMENTO,
    width: LARGURA_CARD,
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    minHeight: 36,
    color: colors.text,
  },
  poster: {
    width: LARGURA_CARD - 24,
    aspectRatio: 2 / 3,
    borderRadius: 8,
    resizeMode: "cover",
  },
  semFoto: {
    width: LARGURA_CARD - 24,
    aspectRatio: 2 / 3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.semFotoBg,
  },
  semFotoTexto: {
    fontWeight: "bold",
    fontSize: 13,
    color: colors.text,
  }
});
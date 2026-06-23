import { StyleSheet } from "react-native";

interface AboutThemeColors {
  background: string;
  cardBg: string;
  border: string;
  text: string;
  subText: string;
}

export const getStyles = (colors: AboutThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'center',
  },
  card: {
    width: "100%",
    maxWidth: 500,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  paragrafo: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
    color: colors.text,
  },
  destaque: {
    fontWeight: '700',
    color: '#e11d48', // Cor primária idêntica aos botões do app
  },
  subtitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: colors.text,
  },
  itemLista: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 6,
    color: colors.subText,
  },
  footer: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.subText,
  }
});
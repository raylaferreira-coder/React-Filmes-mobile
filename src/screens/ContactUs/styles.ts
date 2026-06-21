import { StyleSheet } from "react-native";

interface ContactThemeColors {
  background: string;
  cardBg: string;
  inputBg: string;
  border: string;
  text: string;
  subText: string;
  placeholder: string;
}

export const getStyles = (colors: ContactThemeColors) => StyleSheet.create({
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
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: colors.text,
  },
  subtitulo: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    color: colors.subText,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: colors.text,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    color: colors.text,
  },
  inputMultiline: {
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 24,
    fontSize: 15,
    textAlignVertical: 'top',
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    color: colors.text,
  },
  botaoEnviar: {
    backgroundColor: '#e11d48', // Cor primária do app
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSuporte: {
    marginTop: 24,
    alignItems: 'center',
    gap: 4,
  },
  infoTexto: {
    fontSize: 13,
    color: colors.subText,
  }
});
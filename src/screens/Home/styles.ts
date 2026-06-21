import { StyleSheet } from "react-native";

interface HomeThemeColors {
  background: string;
  cardBg: string;
  border: string;
  text: string;
  subText: string;
  primary: string;
}

export const getStyles = (colors: HomeThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 24,
  },
  header: {
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saudacao: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subSaudacao: {
    fontSize: 14,
    marginTop: 4,
    color: colors.subText,
  },
  bannerDestaque: {
    width: "100%",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 32,
  },
  tagDestaque: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(225, 29, 72, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  tagTexto: {
    color: '#e11d48',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tituloDestaque: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text,
  },
  textoDestaque: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.subText,
  },
  seccaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  grelhaAcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  cartaoAcao: {
    width: '47%', // Garante duas colunas alinhadas com o gap
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconeAcao: {
    marginBottom: 12,
    color: colors.primary,
  },
  textoAcao: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
  }
});
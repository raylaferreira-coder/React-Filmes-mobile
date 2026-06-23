import { StyleSheet } from "react-native";

interface LoginThemeColors {
  background: string;
  cardBg: string;
  inputBg: string;
  border: string;
  text: string;
  subText: string;
  placeholder: string;
}


export const getStyles = (colors: LoginThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  loginCard: {
    width: "100%", 
    maxWidth: 380,
    borderRadius: 12,
    padding: 28, 
    borderWidth: 1,
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.text,
  },
  erroTexto: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',    
    alignItems: 'center',    
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    marginBottom: 16,        
    paddingHorizontal: 12,
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
  },
  icon: { 
    marginRight: 10 
  },
  input: {
    flex: 1,                  
    height: '100%',
    fontSize: 15,
    color: colors.text,
  },
  botaoEntrar: {
    backgroundColor: '#e11d48',
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dicaTexto: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
    color: colors.placeholder,
  }
});
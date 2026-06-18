import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Pressable, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../@types/Navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Consumindo os nossos contextos globais e navegação tipada
  const navigation = useNavigation<NavigationProp>();
  const { login, isLoading } = useAuth();
  const { currentTheme } = useTheme();

  // Definição dinâmica da paleta de cores baseada no tema ativo
  const isDark = currentTheme === 'dark';
  const themeColors = {
    background: isDark ? '#15151a' : '#f3f4f6',
    cardBg: isDark ? '#1e1e24' : '#ffffff',
    inputBg: isDark ? '#15151a' : '#f9fafb',
    border: isDark ? '#2e2e38' : '#e5e7eb',
    text: isDark ? '#ffffff' : '#111827',
    subText: isDark ? '#9ca3af' : '#4b5563',
    placeholder: isDark ? '#6b7280' : '#9ca3af',
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    // Executa a função de login assíncrona do AuthContext
    const success = await login(email, password);

    if (success) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Erro de Autenticação", "E-mail ou senha incorretos.");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.loginCard, { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }]}>
        
        <Text style={[styles.titleText, { color: themeColors.text }]}>Login</Text>
        
        {/* INPUT DE E-MAIL */}
        <View style={[styles.inputRow, { backgroundColor: themeColors.inputBg, borderColor: themeColors.border }]}>
          <MaterialIcons name="email" size={22} color={themeColors.subText} style={styles.icon} />
          <TextInput   
            style={[styles.input, { color: themeColors.text }]} 
            placeholder="E-mail" 
            placeholderTextColor={themeColors.placeholder}
            onChangeText={setEmail} 
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading} 
          />
        </View>
        
        {/* INPUT DE SENHA */}
        <View style={[styles.inputRow, { backgroundColor: themeColors.inputBg, borderColor: themeColors.border }]}>
          <MaterialIcons name="lock" size={22} color={themeColors.subText} style={styles.icon} />
          <TextInput 
            style={[styles.input, { color: themeColors.text }]}
            placeholder="Senha" 
            placeholderTextColor={themeColors.placeholder}
            secureTextEntry={true}
            onChangeText={setPassword} 
            value={password}
            autoCapitalize="none"
            editable={!isLoading}
          /> 
        </View>

        <Pressable 
          style={[styles.botaoEntrar, { opacity: isLoading ? 0.7 : 1 }]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.botaoTexto}>Entrar</Text>
          )}
        </Pressable>

        <Text style={[styles.dicaTexto, { color: themeColors.placeholder }]}>
          Dica para teste: teste@teste.com | 123456
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loginCard: {
    width: "100%", 
    maxWidth: 380, // responsividade para telefones
    borderRadius: 12,
    padding: 28, 
    borderWidth: 1,
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
  },
  inputRow: {
    flexDirection: 'row',    
    alignItems: 'center',    
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    marginBottom: 16,        
    paddingHorizontal: 12,
  },
  icon: { 
    marginRight: 10 
  },
  input: {
    flex: 1,                  
    height: '100%',
    fontSize: 15,
  },
  botaoEntrar: {
    backgroundColor: '#e11d48', // Vermelho Cinema destacado
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
  }
});
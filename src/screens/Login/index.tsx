import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
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
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext"; 
import { getStyles } from "./styles"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation<NavigationProp>();
  const { currentTheme } = useTheme();
  const { login } = useAuth(); 
  
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

  const styles = getStyles(themeColors);

  function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    setErro("");

    login(email.trim(), password)
      .then((sucesso) => {
        setIsLoading(false);
        if (sucesso) {
          navigation.navigate("DrawerNavigator"); 
        } else {
          setErro("Usuário ou senha inválidos.");
          Alert.alert("Erro no Login", "Usuário ou senha inválidos.");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        const mensagemErro = err.response?.data?.message || "Falha na conexão com o servidor.";
        setErro(mensagemErro);
        Alert.alert("Erro no Login", mensagemErro);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginCard}>
        
        <Text style={styles.titleText}>Login</Text>
        
        {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
        
        <View style={styles.inputRow}>
          {/* Mantemos as propriedades de ícone e placeholder que exigem string direta do tema */}
          <MaterialIcons name="email" size={22} color={themeColors.subText} style={styles.icon} />
          <TextInput   
            style={styles.input} 
            placeholder="E-mail" 
            placeholderTextColor={themeColors.placeholder}
            onChangeText={setEmail} 
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isLoading} 
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
       
        <View style={styles.inputRow}>
          <MaterialIcons name="lock" size={22} color={themeColors.subText} style={styles.icon} />
          <TextInput 
            ref={passwordInputRef}
            style={styles.input}
            placeholder="Senha" 
            placeholderTextColor={themeColors.placeholder}
            secureTextEntry={true}
            onChangeText={setPassword} 
            value={password}
            autoCapitalize="none"
            editable={!isLoading}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
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

        <Text style={styles.dicaTexto}>
          Dica para teste: teste@teste.com | 123456
        </Text>
      </View>
    </SafeAreaView>
  );
}
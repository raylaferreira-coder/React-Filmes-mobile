import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface PostFormProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export default function PostForm({ value, onChangeText, onSubmit }: PostFormProps) {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const themeColors = {
    cardBg: isDark ? "#1e1e24" : "#ffffff",
    border: isDark ? "#2e2e38" : "#e5e7eb",
    text: isDark ? "#ffffff" : "#111827",
    placeholder: isDark ? "#6b7280" : "#9ca3af",
    inputBg: isDark ? "#15151a" : "#f9fafb",
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Compartilhe sua opinião</Text>
      
      <TextInput
        style={[
          styles.input,
          { backgroundColor: themeColors.inputBg, color: themeColors.text, borderColor: themeColors.border }
        ]}
        placeholder="O que você achou desse filme?..."
        placeholderTextColor={themeColors.placeholder}
        multiline={true}
        numberOfLines={4}
        value={value}
        onChangeText={onChangeText}
        textAlignVertical="top" // Alinhamento consistente para topo no Android e iOS
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
          <Text style={styles.submitBtnText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  submitBtn: {
    backgroundColor: "#1d9e75", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  submitBtnText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [text, setText] = useState("");
  const { currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const themeColors = {
    bg: isDark ? "#1e1e24" : "#ffffff",
    border: isDark ? "#2e2e38" : "#e5e7eb",
    text: isDark ? "#ffffff" : "#111827",
    placeholder: isDark ? "#6b7280" : "#9ca3af",
    icon: isDark ? "#9ca3af" : "#6b7280",
  };

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleSearch = () => {
  onSearch(text);
  };

  const handleClear = () => {
    setText("");
    onSearch("");
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg, borderColor: themeColors.border }]}>
      <TouchableOpacity
  onPress={handleSearch}
  style={styles.searchIcon}
>
  <Feather
    name="search"
    size={18}
    color={themeColors.icon}
  />
</TouchableOpacity>
      
      <TextInput
        style={[styles.input, { color: themeColors.text }]}
        placeholder="Pesquisar na comunidade..."
        placeholderTextColor={themeColors.placeholder}
        value={text}
        onChangeText={handleChange}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="none"
      />

      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Feather name="x" size={16} color={themeColors.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 15,
  },
  clearButton: {
    padding: 4,
  },
});
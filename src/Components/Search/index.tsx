import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface SearchProps {
  onSearch: (query: string | null) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const { currentTheme } = useTheme();
  const isLight = currentTheme === "light";

  const colors = {
    text: isLight ? "#333333" : "#ffffff",
    border: isLight ? "rgba(128, 128, 128, 0.4)" : "rgba(255, 255, 255, 0.2)",
    inputBg: isLight ? "#ffffff" : "#2a2a2a",
    placeholder: isLight ? "#888888" : "#999999",
  };

  function handleChange(valor: string) {
    setQuery(valor);
    if (valor.trim() === "") {
      onSearch(null);
    }
  }

  function handleSubmit() {
    if (query.trim() !== "") {
      onSearch(query.trim());
    }
  }

  function handleLimpar() {
    setQuery("");
    onSearch(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border },
          ]}
          placeholder="Buscar filme por nome..."
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.btnBuscar} onPress={handleSubmit}>
          <Text style={styles.btnBuscarText}>Buscar</Text>
        </TouchableOpacity>
        {query.length > 0 && (
          <TouchableOpacity
            style={[styles.btnLimpar, { borderColor: colors.border }]}
            onPress={handleLimpar}
          >
            <Text style={[styles.btnLimparText, { color: colors.text }]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    maxWidth: 600,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  btnBuscar: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#0070f3",
    borderRadius: 8,
  },
  btnBuscarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnLimpar: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLimparText: {
    fontSize: 18,
  },
});
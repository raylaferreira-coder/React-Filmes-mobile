import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation }: DrawerHeaderProps) {
  const { currentTheme, setThemeMode } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  const isLight = currentTheme === "light";
  const bgColor = isLight ? "#fafafa" : "#1e1e24";
  const borderColor = isLight ? "#e0e0e0" : "#2e2e38";
  const textColor = isLight ? "#000000" : "#ffffff";

  return (
    <View style={[styles.header, { backgroundColor: bgColor, borderBottomColor: borderColor }]}>
      <View style={styles.leftSection}>
        {/* Aciona o Drawer lateral nativo */}
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuBtn}>
          <MaterialIcons name="menu" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>React Filmes 🎬</Text>
      </View>

      <View style={styles.userSection}>
        {user && (
          <Text style={[styles.username, { color: isLight ? "#4b5563" : "#9ca3af" }]}>
            Olá, {user.name}
          </Text>
        )}

        <TouchableOpacity 
          onPress={async () => await setThemeMode(currentTheme === "light" ? "dark" : "light")} 
          style={[styles.themeBtn, { backgroundColor: isLight ? "#333" : "#f0f0f0" }]}
        >
          <MaterialIcons name={isLight ? "dark-mode" : "light-mode"} size={16} color={isLight ? "#fff" : "#333"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <MaterialIcons name="logout" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 12,
    paddingTop: Platform.OS === "ios" ? 50 : 36,
    borderBottomWidth: 1,
  },
  leftSection: { flexDirection: "row", alignItems: "center", gap: 8 },
  menuBtn: { padding: 4 },
  title: { fontSize: 16, fontWeight: "bold" },
  userSection: { flexDirection: "row", alignItems: "center", gap: 12 },
  username: { fontSize: 13, fontWeight: "600" },
  themeBtn: { padding: 6, borderRadius: 6 },
  logoutBtn: { padding: 4 }
});
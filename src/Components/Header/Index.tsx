import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext'; 

export default function Header({ navigation }: any) {
  const { theme, toggleTheme } = useTheme();

  const usuarioLogado = "usuario"; 

  const handleLogout = () => {

    navigation.navigate("Login"); 
  };

  const isLight = theme === 'light';
  const bgColor = isLight ? '#fafafa' : '#1e1e1e';
  const borderColor = isLight ? '#e0e0e0' : '#333';
  const textColor = isLight ? '#000000' : '#ffffff';

  return (
    <View style={[styles.header, { backgroundColor: bgColor, borderBottomColor: borderColor }]}>

      <Text style={[styles.title, { color: textColor }]}>React Filmes 🎬</Text>

      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.link, { color: textColor }]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={[styles.link, { color: textColor }]}>Sobre</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <Text style={[styles.link, { color: textColor }]}>Contato</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userSection}>
        {usuarioLogado ? (
          <Text style={[styles.username, { color: textColor }]}>{usuarioLogado}</Text>
        ) : null}

        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.themeBtn,
            { backgroundColor: isLight ? '#333' : '#f0f0f0' }
          ]}
        >
          <Text style={[styles.themeBtnText, { color: isLight ? '#fff' : '#333' }]}>
            {isLight ? 'Dark' : 'Light'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    paddingTop: 40, 
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    gap: 12,
  },
  link: {
    fontWeight: '500',
    fontSize: 14,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  username: {
    fontSize: 14,
  },
  logoutBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#ff4d4f',
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  themeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  themeBtnText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
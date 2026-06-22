import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../data/api';

export default function FeedInput({ filmeId, onPostPublicado, colors, styles }: any) {
  const [texto, setTexto] = useState("");
  const { user } = useAuth();

  async function publicar() {
    if (!texto.trim()) return;
    try {
      const res = await api.post("/comentario", {
        nome: user?.email || "Usuário",
        postagem: texto,
        dataPostagem: new Date().toISOString(),
        filmeId
      });
      onPostPublicado(res.data);
      setTexto("");
    } catch (err) {
      console.error("Erro ao publicar:", err);
    }
  }

  return (
    <View style={styles.caixaCriarPost}>
      <Text style={styles.createPostTitle}>Compartilhe sua opinião</Text>
      <TextInput
        style={styles.campoTexto}
        placeholder="O que você achou desse filme?..."
        placeholderTextColor={colors.subText}
        multiline
        numberOfLines={4}
        value={texto}
        onChangeText={setTexto}
        textAlignVertical="top"
      />
      <View style={styles.botoesForm}>
        <TouchableOpacity style={styles.btnPublicar} onPress={publicar}>
          <Text style={styles.btnPublicarText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
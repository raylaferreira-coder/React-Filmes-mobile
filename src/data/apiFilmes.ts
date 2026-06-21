import axios from "axios";

const apiFilmes = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: 'application/json',
    // Alterado de import.meta.env.VITE_TMDB_TOKEN para process.env.EXPO_PUBLIC_TMDB_TOKEN
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`
  },
  params: {
    language: "pt-BR",
    include_adult: false,
  },
});

export default apiFilmes;
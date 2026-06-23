import axios from "axios";

const apiFilmes = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: 'application/json',
    // Altera para process.env.EXPO_PUBLIC_TMDB_TOKEN quando subir pro gitHub criando um .env
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzQ4N2UxYmQ4NWNlNWJmODkxYWY1MjVjMmI4Y2ViOSIsIm5iZiI6MTc4MTEzNDM3OC42NjUsInN1YiI6IjZhMjlmNDJhMzdjODg3NGIzNTQwNzk4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.npv2AUjXv44BFv5jqCFqBRK0jhUTMZ7fspyvDkwxUuY`
  },
  params: {
    language: "pt-BR",
    include_adult: false,
  },
});

export default apiFilmes;
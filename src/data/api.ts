import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: "https://api-mobile-egw1.onrender.com/",
    timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    try {
     
      const token = await AsyncStorage.getItem('@filmes_api:token');
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao injetar o token no header do Axios', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
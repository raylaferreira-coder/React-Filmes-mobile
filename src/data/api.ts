import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } 
    }
    catch (error) {
      console.error("Erro ao recuperar o token do AsyncStorage", error);
    }

    return config;
},
(error) => {
    return Promise.reject(error);
  }
);

export default api;
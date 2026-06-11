/* eslint-disable import/no-named-as-default-member */
import axios from "axios";
import * as SecureStore from "expo-secure-store"; // Or react-native-mmkv / AsyncStorage

const apiClient = axios.create({
  baseURL: "https://api.yourdomain.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept every request to add the token dynamically
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken"); // Fetch token from storage
    if (token) {
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjQ5ODZhYTE5ZDUzNTg3NDQ5ZDhiODBiODU1YjFjNyIsIm5iZiI6MTcyNjIyMzYzNy40MjksInN1YiI6IjY2ZTQxNTE1ZjQ2N2MyYWQ2MmY5NzdkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.19NVhgz2WoxtSETp-WEkKlolPAhKDB0tVehS9DpZ1wY`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;

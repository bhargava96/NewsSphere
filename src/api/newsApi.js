import axios from "axios";

let lastRequestTime = 0;

const api = axios.create({
  baseURL: "https://newsapi.org/v2",
  timeout: 10000,
  params: {
    apiKey: process.env.REACT_APP_NEWS_API_KEY
  }
});

api.interceptors.request.use((config) => {
  const now = Date.now();
  if (now - lastRequestTime < 1200) {
    throw new axios.Cancel("Rate limit protection");
  }
  lastRequestTime = now;
  return config;
});

export default api;

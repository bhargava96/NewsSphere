import axios from "axios";

let lastRequestTime = 0;

const api = axios.create({
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const now = Date.now();
  if (now - lastRequestTime < 1200) {
    throw new axios.Cancel("Rate limit protection");
  }
  lastRequestTime = now;

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocalhost) {
    config.baseURL = "https://newsapi.org/v2";
    config.params = {
      ...config.params,
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
    };
  } else {
    // On Vercel: proxy requests through our serverless function /api/news
    const originalUrl = config.url || "";
    config.baseURL = "";
    config.url = "/api/news";
    config.params = {
      ...config.params,
      endpoint: originalUrl,
    };
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      console.error("NewsAPI Error Response Details:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;

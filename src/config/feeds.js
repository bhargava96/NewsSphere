export const feeds = {
  tesla: {
    title: "Tesla News",
    endpoint: "/everything",
    params: {
      q: "tesla",
      sortBy: "publishedAt",
      pageSize: 10,
      language: "en",
    },
  },

  techcrunch: {
    title: "TechCrunch",
    endpoint: "/everything",
    params: {
      sources: "techcrunch",
      pageSize: 10,
      language: "en",
    },
  },

  wsj: {
    title: "Wall Street Journal",
    endpoint: "/everything",
    params: {
      domains: "wsj.com",
      pageSize: 10,
      language: "en",
    },
  },

  apple: {
    title: "Apple News",
    endpoint: "/everything",
    params: {
      q: "apple",
      sortBy: "popularity",
      pageSize: 10,
      language: "en",
    },
  },
};

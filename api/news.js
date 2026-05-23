// api/news.js
// Vercel Serverless Function to proxy NewsAPI requests in production
const axios = require("axios");

module.exports = async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { endpoint, ...otherParams } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' });
    }

    // Retrieve API key from environment variables
    const apiKey = process.env.REACT_APP_NEWS_API_KEY || process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'API key is not configured on the server',
        diagnostics: {
          hasReactAppKey: !!process.env.REACT_APP_NEWS_API_KEY,
          hasNewsApiKey: !!process.env.NEWS_API_KEY,
          availableEnvKeys: Object.keys(process.env).filter(
            (key) => key.includes("KEY") || key.includes("API") || key.includes("SECRET")
          )
        }
      });
    }

    // Construct NewsAPI URL
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Call NewsAPI using axios
    const apiResponse = await axios.get(`https://newsapi.org/v2${formattedEndpoint}`, {
      params: {
        ...otherParams,
        apiKey
      },
      timeout: 10000,
      validateStatus: () => true // Allow any status code from NewsAPI to pass through
    });

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Return the response code and data from NewsAPI
    return res.status(apiResponse.status).json(apiResponse.data);
  } catch (error) {
    console.error('NewsAPI proxy error:', error);
    return res.status(500).json({
      error: 'Failed to fetch from NewsAPI',
      message: error.message,
      stack: error.stack,
      diagnostics: {
        nodeVersion: process.version
      }
    });
  }
};

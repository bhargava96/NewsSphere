// api/news.js
// Vercel Serverless Function to proxy NewsAPI requests in production

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { endpoint, ...otherParams } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' });
    }

    // Retrieve API key from environment variable (client env REACT_APP_ or server env NEWS_API_KEY)
    const apiKey = process.env.REACT_APP_NEWS_API_KEY || process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key is not configured on the server' });
    }

    // Construct NewsAPI URL
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Construct query parameters
    const queryParams = new URLSearchParams({
      ...otherParams,
      apiKey
    });

    const targetUrl = `https://newsapi.org/v2${formattedEndpoint}?${queryParams.toString()}`;

    // Fetch from NewsAPI
    const response = await fetch(targetUrl);
    const data = await response.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Return the status and data from NewsAPI
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('NewsAPI proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch from NewsAPI', details: error.message });
  }
}

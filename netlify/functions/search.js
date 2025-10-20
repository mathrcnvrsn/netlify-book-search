import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function handler(event, context) {
  const { url, query } = event.queryStringParameters || {};
  if (!url || !query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Les paramètres "url" et "query" sont requis.' }),
    };
  }
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'netlify-serverless' } });
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Erreur lors de la récupération de la page : ${response.statusText}` }),
      };
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const textContent = $('body').text();
    const found = textContent.toLowerCase().includes(query.toLowerCase());
    return {
      statusCode: 200,
      body: JSON.stringify({ url, query, found }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
}

import axios from 'axios';
//import JSDOM from 'jsdom';

export async function handler(event, context) {
  const { query } = event.queryStringParameters || {};
  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Les paramètres "url" et "query" sont requis.' }),
    };
  }

    try {
               
    //     const response = await axios.get(`https://mediathequemallemort.opac-x.com/recherche?general=${query}`); //, { headers: { 'User-Agent': 'netlify-serverless' } });
    
    // if(response.status !== 200) {
	// 		return {statusCode: response.status, body: `Localities fetch error: ${response.statusText}`};
	// 	}

    //     //const dom = new JSDOM(response.data);
    //     //const found = dom.window.document.querySelector("div.titre_doc > a")
         const found = true;

		return {
			statusCode: 200,
			body: JSON.stringify({ query, found }),

		};
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
}

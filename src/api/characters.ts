// api/characters.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req.query;
    // Fetch data from your API using the query parameter
    // Implement your logic to fetch characters based on the query
    
    // For example, you might use your existing fetch logic:
    const response = await fetch(`https://hp-api.onrender.com/api/characters?name=${query}`);
    const char = await response.json();

    res.status(200).json(char);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

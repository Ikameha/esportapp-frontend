import axios from 'axios';

export async function getMatches() {
  const response = await axios.get('http://localhost:3001/matches');
  return response.data;
}

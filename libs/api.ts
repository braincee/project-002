import axios from 'axios';

export const initDb = async () => {
  const response = await axios.get('api/initDb');
  return response;
}
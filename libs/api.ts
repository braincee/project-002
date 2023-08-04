import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

export const initDb = async () => {
  const response = await axios.get('api/initDb');
  return response;
}

export const addAddress = async ({ address } : {address: any}) => {
  const id = uuidV4();
  const data = {
    id, address,
  }
  const response = await axios.post('/api/address/addAddress', { data })
  return response;
}
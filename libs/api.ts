import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

export const initDb = async () => {
  const response = await axios.get('api/initDb');
  return response;
}

export const addAddress = async ({ address } : {address: string}) => {
  const id = uuidV4();
  const data = {
    id, address,
  }
  const response = await axios.post('/api/address/addAddress', { data })
  return response;
}

export const addContent = async ({ content } : {content: string}) => {
  const id = uuidV4();
  const data = {
    id, content,
  }
  const response = await axios.post('/api/addContent', { data })
  return response;
}

export const getAddresses = async () => {
  const data = await axios.get(('/api/address/getAllAddresses'));
  return data;
}
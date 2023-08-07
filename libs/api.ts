import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

export const initDb = async () => {
  const response = await axios.get('api/initDb');
  return response;
}

export const getAddress = async ({ addressId }: {addressId: string}) => {
  const response = await axios.get(('/api/address'), {
    params: { addressId },
  });
  return response;
}

export const getContent = async ({ contentId }: {contentId: string}) => {
  const response = await axios.get(('/api/content'), {
    params: { contentId },
  });
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

export const addContent = async ({ title, description } : {title: string, description: string}) => {
  const id = uuidV4();
  const data = {
    id, title, description
  }
  const response = await axios.post('/api/content/addContent', { data })
  return response;
}

export const getAddresses = async () => {
  const response = await axios.get(('/api/address/getAllAddresses'));
  return response;
}

export const getContentItems = async () => {
  const response = await axios.get(('/api/content/getAllContentItems'));
  return response;
}

export const addAddressIdContentIds = async ({addressId, contentIds}:{addressId: string | null, contentIds: readonly string[]}) => {
  const response = await axios.post('/api/address/addAllowed', {addressId , contentIds})
  return response;
}

export const addContentIdAddressIds = async ({contentId, addressIds}:{contentId: string | null, addressIds: readonly string[]}) => {
  const response = await axios.post('/api/content/addAllowed', {contentId , addressIds})
  return response;
}

export const removeContentIdAddressIds = async ({contentId, addressIds}: {contentId: string | null, addressIds: readonly string[]}) => {
  const response = await axios.post('/api/content/removeAllowed', {contentId, addressIds});
  return response;
}

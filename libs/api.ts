import { v4 as uuidV4 } from "uuid";
import supabase from "./supabase";

export const initDb = async () => {
  const response = await fetch("api/initDb");
  return response.json();
};

export const getAddress = async ({ addressId }: { addressId: string }) => {
  const response = await fetch(`/api/address?addressId=${addressId}`);
  return response.json();
};

export const getContent = async ({ contentId }: { contentId: string }) => {
  const response = await fetch(`/api/content/${contentId}`);
  return response.json();
};

export const addAddress = async ({ address }: { address: string }) => {
  const id = uuidV4();
  const data = {
    id,
    address,
  };
  const response = await fetch("/api/address/addAddress", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const addContent = async ({
  id,
  title,
  description,
  url,
  urlString,
}: {
  id: string;
  title: string;
  description: string;
  url?: string;
  urlString?: string;
}) => {
  let data;
  if (url) {
    data = {
      id,
      title,
      description,
      url,
    };
  } else {
    const data = {
      id,
      title,
      description,
      urlString,
    };
  }
  const response = await fetch("/api/content/add", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAddresses = async () => {
  const response = await fetch("/api/address/getAllAddresses");
  return response.json();
};

export const getContentItems = async () => {
  const response = await fetch("/api/content/getAllContentItems");
  return response.json();
};

export const addAddressIdContentIds = async ({
  addressId,
  contentIds,
}: {
  addressId: string | null;
  contentIds: readonly string[];
}) => {
  const data = {
    addressId,
    contentIds,
  };
  const response = await fetch("/api/address/addAllowed", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const addContentIdAddressIds = async ({
  contentId,
  addressIds,
}: {
  contentId: string | null;
  addressIds: readonly string[];
}) => {
  const data = {
    contentId,
    addressIds,
  };
  const response = await fetch(`/api/content/${contentId}/addAllowed`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const removeContentIdAddressIds = async ({
  contentId,
  addressIds,
}: {
  contentId: string | null;
  addressIds: readonly string[];
}) => {
  const data = {
    contentId,
    addressIds,
  };
  const response = await fetch(`/api/content/${contentId}/removeAllowed`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const addFileToContentsStorage = async (file: any) => {
  const filename = `${uuidV4()}.${file.name.substring(
    file.name.lastIndexOf(".") + 1,
    file.name.length
  )}`;

  const response = await supabase.storage
    .from("contents")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (response?.error && response?.error?.message) {
    return response.error.message;
  }
  return filename;
};

export const getFilePublicURL = async (filename: string) => {
  const contentId = uuidV4();
  const response = await fetch(`/api/content/{${contentId}}/requestContent`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(filename),
  });
  return { url: response.url, contentId };
};

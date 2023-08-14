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

export const addAddress = async ({
  id,
  address,
}: {
  id: string;
  address: string;
}) => {
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

export const removeAddressIdContentIds = async ({
  contentIds,
  addressId,
}: {
  contentIds: readonly string[];
  addressId: string | null;
}) => {
  const data = {
    contentIds,
    addressId,
  };
  const response = await fetch(`/api/address/removeAllowed`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const removeContent = async ({
  id,
  keep_orfans,
}: {
  id: string;
  keep_orfans: boolean;
}) => {
  const response = await fetch(`/api/content/${id}/removeContent`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id, keep_orfans }),
  });
  return response;
};

const getFileFromUrl = async (
  url: any,
  name: string,
  defaultType = "image/png"
) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext =
    (data?.type && data?.type.slice(data.type.indexOf("/") + 1)) || "png";
  const file = new File([data], `${name}.${ext}`, {
    type: data.type || defaultType,
  });
  return file;
};

export const addFileToContentsStorage = async ({
  file,
  urlString,
}: {
  file?: any;
  urlString?: any;
}) => {
  if (urlString) {
    const myFile = await getFileFromUrl(
      urlString,
      new Date().getTime().toString()
    );
    const filename = `${uuidV4()}.${myFile.name.substring(
      myFile.name.lastIndexOf(".") + 1,
      myFile.name.length
    )}`;

    const response = await supabase.storage
      .from("contents")
      .upload(filename, myFile, {
        cacheControl: "3600",
        upsert: false,
      });
    if (response?.error && response?.error?.message) {
      return response.error.message;
    }
    return filename;
  } else {
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
  }
};

export const getFilePublicURL = async (filename: string) => {
  // const { data } = supabase.storage.from("contents").getPublicUrl(filename);
  const contentId = uuidV4();
  const response = await fetch(`/api/content/${contentId}/requestContent`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(filename),
  });
  const data = await response.json();
  return { data, contentId };
};

import supabase from "@/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { StorageClient } from "@supabase/storage-js";

const storageClient = new StorageClient(
  process.env.NEXT_SUPABASE_STORAGE_URL!,
  {
    apiKey: process.env.NEXT_SUPABASE_SERVICE_KEY!,
    Authorization: `Bearer ${process.env.NEXT_SUPABASE_SERVICE_KEY}`,
  }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filename = req.body;
  const { data } = supabase.storage.from("contents").getPublicUrl(filename);
  const index = data.publicUrl.indexOf("contents/");
  const length = "contents/".length;

  const result = data.publicUrl.slice(index + length);
  const object = await storageClient.from("contents").list("", {
    search: result,
  });

  const mimeType =
    (object.data && object.data[0].metadata.mimetype) || "unknown";
  const response = {
    data,
    mimeType,
  };

  res.status(200).json({ response: response });
}

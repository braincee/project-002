import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const response = await supabase.storage
  //   .from("contents")
  //   .upload("filename", file, {
  //     cacheControl: "3600",
  //     upsert: false,
  //   });
  res.status(200).json({ response: "response" });
}

import supabase from "@/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = req.body;
  console.log(typeof form);
  // const response = await supabase.storage
  //   .from("contents")
  //   .upload(filename, file, {
  //     cacheControl: "3600",
  //     upsert: false,
  //   });
  res.status(200).json({ response: "response" });
}

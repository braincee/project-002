import supabase from "@/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filename, file } = req.body;
  await supabase.storage.from("contents").upload(filename, file);
  res.status(200).json({ response: filename });
}

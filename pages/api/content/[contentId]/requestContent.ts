import supabase from "@/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filename = req.body;
  const response = await supabase.storage
    .from("contents")
    .getPublicUrl(filename);
  res.status(200).json({ response: response });
}

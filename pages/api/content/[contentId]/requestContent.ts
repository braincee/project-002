import supabase from "@/libs/supabase";
import { NextApiRequest, NextApiResponse } from "next";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabase2: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const filename = req.body;
  // const response = supabase.storage.from("contents").getPublicUrl(filename);
  const response = supabase2.from("objects").select();
  res.status(200).json({ response: response });
}

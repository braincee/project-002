import { User } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await User.findAll({
    order: [["created_at", "DESC"]],
  });
  res.status(200).json({ response: response });
}

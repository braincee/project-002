import { Address, Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await Content.findAll({
    order: [["created_at", "DESC"]],
    include: { model: Address },
  });
  res.status(200).json({ response: response });
}

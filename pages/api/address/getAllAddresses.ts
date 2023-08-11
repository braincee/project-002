import { Address, Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await Address.findAll({
    order: [["created_at", "DESC"]],
    include: { model: Content },
  });
  res.status(200).json({ response: response });
}

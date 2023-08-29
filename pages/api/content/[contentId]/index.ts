import { Address, Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contentId } = req.query as any;
  const response = await Content.findByPk(contentId, {
    include: Address,
  });
  res.status(200).json({ response: response });
}

import { Address, Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { addressId } = req.query as any;
  console.log(addressId);
  const response = await Address.findOne({
    where: { id: addressId },
    include: Content,
  });
  res.status(200).json({ response: response });
}

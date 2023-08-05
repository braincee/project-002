import { Address, Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const response = await Address.findAll({include: Content});
  res.status(200).json({ response: response });
}
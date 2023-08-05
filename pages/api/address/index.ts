import { Address } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { address }  = req.query as any;
  const response = await Address.findByPk(address);
  res.status(200).json({ response: response });
}
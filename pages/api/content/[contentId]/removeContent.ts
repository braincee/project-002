import { Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body;
  console.log(id);
  const response = await Content.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({ response: response });
}

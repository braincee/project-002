import { ContentAddress } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { addressId, contentIds } = req.body;
  const response = await contentIds.forEach((contentId: any) => {
    ContentAddress.create({
      address_id: addressId,
      content_id: contentId,
    });
  });
  res.status(200).json({ response: response });
}

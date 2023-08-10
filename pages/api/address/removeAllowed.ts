import { ContentAddress } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contentIds, addressId } = req.body;
  const response = await contentIds.forEach((contentId: string) => {
    ContentAddress.destroy({
      where: {
        address_id: addressId,
        content_id: contentId,
      },
    });
  });
  res.status(200).json({ response: response });
}

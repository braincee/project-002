import { ContentAddress } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contentId, addressIds } = req.body;
  const response = await addressIds.forEach((addressId: string) => {
    ContentAddress.destroy({
      where: {
        address_id: addressId,
        content_id: contentId,
      },
    });
  });
  res.status(200).json({ response: response });
}

import { ContentAddress } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { addressId, content }  = req.body;
  const response = await content.forEach((contentItem: any) => {
   ContentAddress.create(
      {
        address_id: addressId,
        content_id: contentItem,
      }
      );
  })
  res.status(200).json({ response: response });
}
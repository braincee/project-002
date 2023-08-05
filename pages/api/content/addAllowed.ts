import { ContentAddress } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { contentId, addresses }  = req.body;
  const response = await addresses.forEach((address: any) => {
    ContentAddress.create(
       {
         address_id: address,
         content_id: contentId,
       }
       );
   })
   res.status(200).json({ response: response });
}
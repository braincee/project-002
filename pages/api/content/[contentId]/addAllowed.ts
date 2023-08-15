import { ContentAddress, Log } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidV4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contentId, addressIds } = req.body;
  const response = await addressIds.forEach((addressId: any) => {
    ContentAddress.create({
      address_id: addressId,
      content_id: contentId,
    });
  });
  const id: any = uuidV4();
  const data = {
    id: id,
    log: Date.now() as any,
  };
  await Log.create(data);
  res.status(200).json({ response: response });
}

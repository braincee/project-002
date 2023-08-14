import { Address, Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, keep_orfans } = req.body;
  if (keep_orfans) {
    await Content.destroy({
      where: {
        id,
      },
    });
  } else {
    let allAddresses = await Address.findAll({
      include: { model: Content },
    });
    let addresses = JSON.stringify(allAddresses);
    const unlinkedAddresses = JSON.parse(addresses)
      .filter((address: any) => address.Contents.length === 0)
      .map((address: any) => address.id);

    await Content.destroy({
      where: {
        id,
      },
    });

    allAddresses = await Address.findAll({
      include: { model: Content },
    });
    addresses = JSON.stringify(allAddresses);
    JSON.parse(addresses).forEach((address: any) => {
      if (
        address.Contents.length === 0 &&
        !unlinkedAddresses.includes(address.id)
      ) {
        Address.destroy({
          where: {
            id: address.id,
          },
        });
      }
    });
  }
  res.status(200).json({ response: "Success" });
}

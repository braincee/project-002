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
    const content = await Content.findByPk(id, {
      include: {
        model: Address,
      },
    });

    const addresses = JSON.parse(JSON.stringify(content)).Addresses;

    await Content.destroy({
      where: {
        id,
      },
    });

    if (addresses.length === 1) {
      Address.destroy({
        where: {
          id: addresses[0].id,
        },
      });
    }
  }
  res.status(200).json({ response: "Success" });
}

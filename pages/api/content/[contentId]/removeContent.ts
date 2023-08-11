import { Address, Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, keep_orfans } = req.body;

  await Content.destroy({
    where: {
      id,
    },
  });
  const allAddresses = await Address.findAll({
    include: { model: Content },
  });
  let addresses = JSON.stringify(allAddresses);

  const filteredAddressesIds = JSON.parse(addresses)
    .filter((address: any) => address.Contents.length === 0)
    .map((address: any) => address.id);
  filteredAddressesIds.forEach((id: any) => {
    let set1 = new Set(keep_orfans);
    let set2 = new Set(keep_orfans);
    set2.add(id);
    if (set2.size > set1.size) {
      Address.destroy({
        where: {
          id: id,
        },
      });
    }
  });
  res.status(200).json({ response: "Success" });
}

import { Address, Content } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, orfans } = req.body;
  await Content.destroy({
    where: {
      id,
    },
  });
  const allAddresses = await Address.findAll({
    include: { model: Content },
  });
  let addresses = JSON.stringify(allAddresses);

  const filteredAddresses = JSON.parse(addresses).filter(
    (address: any) => address.Contents.length == 0
  );
  filteredAddresses.forEach((address: any) => {
    let set1 = new Set(orfans);
    let set2 = new Set(orfans);
    set2.add(address);
    if (set2.size > set1.size) {
      Address.destroy({
        where: {
          id: address.id,
        },
      });
    }
  });
  res.status(200).json({ response: "Success" });
}

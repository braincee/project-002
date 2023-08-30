import { User } from "@/libs/models";
import { NextApiRequest, NextApiResponse } from "next";
import { compareSync } from "bcrypt-ts";

const comparePassword = (password: string, hash: any) => {
  const result = compareSync(password, hash);
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const user = JSON.parse(
    JSON.stringify(
      await User.findOne({
        where: {
          email: data.email,
        },
      })
    )
  );
  let response;
  if (user) {
    const status = comparePassword(data.password, user.password);
    if (status) {
      response = {
        id: user.id,
        email: user.email,
      };
    } else {
      response = "Invalid password";
    }
  } else {
    response = null;
  }

  res.status(200).json({ response: response });
}

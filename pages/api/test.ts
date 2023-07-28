import sequelize, { testDbConnection } from "@/libs/db";

export default async function handler(req: any, res: any) {
  const response = await testDbConnection();
  res.status(200).json({ response: response });
}
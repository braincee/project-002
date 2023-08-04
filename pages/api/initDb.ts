import { initDB } from "@/libs/models";
import sequelize from '@/libs/db';

export default async function handler(req: any, res: any) {
  await sequelize.sync();
  const response = await initDB();
  res.status(200).json({ response: response });
}
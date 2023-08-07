import sequelize from "../db";
import { Address, Content, ContentAddress, Log, User } from "./definitions";

export { Address, Content, ContentAddress, Log, User };

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await Content.findAll();
    await Address.findAll();
    await ContentAddress.findAll();
    await Log.findAll();
    await User.findAll();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

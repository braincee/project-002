import sequelize from "../db"
import { Address } from "./definitions/Address";
import { Content } from "./definitions/Content";
import { ContentAddress } from "./definitions/ContentAddress";
import { Log } from "./definitions/Log";
import { User } from "./definitions/User";


// export { Address, Content, ContentAddress, Log, User };

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await Content.findAll();
    await Address.findAll();
    await ContentAddress.findAll();
    await Log.findAll();
    await User.findAll();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

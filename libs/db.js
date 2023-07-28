import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.NEXT_PUBLIC_POSTGRESQL_URI);

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default sequelize;



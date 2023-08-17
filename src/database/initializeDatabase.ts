import { sequelize } from "./config";
import * as process from "process";

export const connectToDb = async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export const closeConnectionToDB = async () => {
  try {
    await sequelize.close();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

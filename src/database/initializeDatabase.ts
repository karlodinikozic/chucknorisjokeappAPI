import { sequelize } from "./config";

export const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Not for production
  } catch (error) {
    console.error("Unable to initialize to the database:", error);
  }
};

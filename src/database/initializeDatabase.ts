import { sequelize } from "./config";

export const initializeDatabase = async () => {
  console.log("HEEEEEYYYY");
  try {
    await sequelize.sync({ force: true }); // Not for production
  } catch (error) {
    console.error("Unable to initialize to the database:", error);
  }
};

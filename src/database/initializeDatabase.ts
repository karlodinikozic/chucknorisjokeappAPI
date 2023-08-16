import { sequelize } from "./config";
import * as process from "process";

const MAX_RETRIES = 10;
const RETRY_INTERVAL = 5000; // 5 seconds

export async function initializeDatabase() {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      await sequelize.authenticate();
      console.log("Database connection established successfully.");
      break;
    } catch (error) {
      console.error("Database connection failed. Retrying...");
      retries++;
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    }
  }

  if (retries === MAX_RETRIES) {
    console.error(
      "Failed to establish database connection after multiple retries. Exiting...",
    );
    process.exit(1);
  }
  await sequelize.sync({force:false});
}

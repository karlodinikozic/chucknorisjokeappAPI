import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME || "mydb"; // Change to your preferred database name
const dbUser = process.env.DB_USER || "root"; // Change to your preferred database user
const dbPassword = process.env.DB_PASSWORD || "password"; // Change to your preferred database password

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "sqlite",
  storage: "mydb.sqlite",
});

export { sequelize };

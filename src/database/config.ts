import { Sequelize } from "sequelize";

const sequelize = new Sequelize({

  database: process.env.DB_NAME || "chucknoris", // Your database name
  username: process.env.DB_USER || "root", // Your MySQL username
  password: process.env.DB_PASSWORD || "root_password", // Your MySQL password
  host: process.env.DB_HOST || "db", // The name of the MySQL service in your Docker Compose
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export { sequelize };

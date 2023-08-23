import dotenv from "dotenv";
import 'reflect-metadata';


dotenv.config(); // * Importing Environment variables
import "./src/config/passport.config"; // * Passport Config

import {closeConnectionToDB, connectToDb} from "./src/database/initializeDatabase";
import * as process from "process";
import serverUtil from "./src/util/serverUtil";

const app = serverUtil.createServer();
const PORT = process.env.PORT;

app.on("SIGINT", async () => {
  console.log('Server is shutting down...');
  await closeConnectionToDB();
  console.log('Server is stopped.');
  process.exit(0);
})

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDb()
});



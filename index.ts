import dotenv from "dotenv";
import 'reflect-metadata';


dotenv.config(); // * Importing Environment variables
import "./config/passport.config"; // * Passport Config

import {connectToDb} from "./src/database/initializeDatabase";
import * as process from "process";
import serverUtil from "./src/util/serverUtil";

const app = serverUtil.createServer();
const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDb()
});

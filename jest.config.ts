// jest.config.ts;

import type { Config } from "@jest/types";
import dotenv from "dotenv";

dotenv.config(); // * Importing Environment variables

// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
};
export default config;

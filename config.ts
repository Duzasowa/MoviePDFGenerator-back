import dotenv from "dotenv";
import logger from "./utils/logger";

const result = dotenv.config({ path: ".env.local" });

if (result.error) {
  throw result.error;
}

logger.info(result.parsed);

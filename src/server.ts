import app from "./app";
import "../config";
import logger from "../utils/logger";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

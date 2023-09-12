import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

const localhost = "127.0.0.1";
const port = 3000;

web.listen(port, localhost, () => {
    logger.info("Server Connect...");
});

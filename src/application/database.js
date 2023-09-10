import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query",
        },
        {
            emit: "event",
            level: "error",
        },
        {
            emit: "event",
            level: "info",
        },
        {
            emit: "event",
            level: "warn",
        },
    ],
});

prismaClient.$on("query", (e) => {
    logger.query(e);
});

prismaClient.$on("error", (e) => {
    logger.error(e);
});

prismaClient.$on("info", (e) => {
    logger.info(e);
});

prismaClient.$on("warn", (e) => {
    logger.warn(e);
});

export { prismaClient };

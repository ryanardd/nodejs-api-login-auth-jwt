import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: "query"
        },
        {
            emit: "event",
            level: 'error'
        },
        {
            emit: "event",
            level: 'info'
        },
        {
            emit: 'event',
            level: 'warn'
        }
    ]
});

prismaClient.$on("query", () => {
    logger.info(e)
})

prismaClient.$on("error", () => {
    logger.error(e)
})

prismaClient.$on("info", () => {
    logger.info(e)
})

prismaClient.$on("warn", () => {
    logger.warn(e)
})

export {
    prismaClient
}
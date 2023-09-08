import winston from "winston";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        winston.transports.Console({})
    ]
})
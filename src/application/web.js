import express from "express";
import { publicRouter } from "../route/public-route";
import { errorMiddleware } from "../error/error-middleware";
import dotenv from "dotenv";

dotenv.config();
export const web = express();
web.use(express.json());

web.use(publicRouter);

web.use(errorMiddleware);

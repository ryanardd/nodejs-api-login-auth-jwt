import express from "express";
import { publicRouter } from "../route/public-route.js";
import { errorMiddleware } from "../error/error-middleware.js";
import dotenv from "dotenv";
import { route } from "../route/api.js";

dotenv.config();
export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(route);

web.use(errorMiddleware);

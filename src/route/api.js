import express from "express";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const route = new express.Router();

route.use(authMiddleware);

route.patch("/api/users/update", userController.update);

export { route };

import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const route = new express.Router();

route.use(authMiddleware);

route.patch("/api/users/update", userController.update);

export { route };

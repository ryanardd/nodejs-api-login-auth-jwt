import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const route = new express.Router();

route.use(authMiddleware);

route.get("/api/user/", userController.get);
route.patch("/api/user/update", userController.update);
route.post("/api/user/logout", userController.logout);

export { route };

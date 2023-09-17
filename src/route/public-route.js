import express from "express";
import userController from "../controller/user-controller.js";
// import { authMiddleware } from "../middleware/auth-middleware.js";

const publicRouter = new express.Router();

publicRouter.post("/api/users/", userController.register);
publicRouter.post("/api/users/login", userController.login);

// route.use(authMiddleware);

// route.patch("/api/users/update", userController.update);

export { publicRouter };

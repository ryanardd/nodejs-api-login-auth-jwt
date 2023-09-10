import express from "express";
import userController from "../controller/user-controller";

const publicRouter = express.Router();

publicRouter.post("/api/users/", userController.register);

export { publicRouter };

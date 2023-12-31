import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const route = new express.Router();

// route.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "Authorization", "Origin, Content-Type, Accept");
//     next();
// });

route.use(authMiddleware);

route.patch("/api/users/update", userController.update);
route.get("/api/users/logout", userController.logout);

export { route };

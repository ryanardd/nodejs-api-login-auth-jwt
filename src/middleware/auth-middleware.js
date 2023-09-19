// import { prismaClient } from "../application/database";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    // MASIH ADA YANG SALAH

    // const token = req.headers.authorization;
    // const token = req.headers.authorization?.split("")[1];
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401)
            .json({
                error: "Unauthorization",
            })
            .end();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                error: "Token invalid",
            });
        }
        req.user = user;

        next();
    });
};

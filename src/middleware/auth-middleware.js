// import { prismaClient } from "../application/database";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    // MASIH ADA YANG SALAH

    // const token = req.headers.authorization;
    // const token = req.headers.authorization?.split("")[1];
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];

    const bearer = req.headers["authorization"];
    let token = bearer.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "Unauthorization",
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                error: "Token invalid",
            });
        }
        req.user = user;

        next();
    });

    // try {
    //     // const token = req.headers.authorization?.split("")[1];
    //     const token = req.headers["authorization"];
    //     // const token = authHeader && authHeader.split(" ")[1];
    //     if (!token) {
    //         return res.status(401).json({
    //             error: "Unauthorization",
    //         });
    //     }
    //     const verifiedUser = verify(token, process.env.ACCESS_TOKEN_SECRET);
    //     console.info(verifiedUser.body);
    //     req.body.data = verifiedUser.username;
    //     await next();
    // } catch (error) {
    //     return res.status(403).json({
    //         error: "Token invalid",
    //     });
    // }
};

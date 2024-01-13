import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
        return res.status(401).json({
            error: "Unauthorization",
        });
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                error: "Token invalid",
            });
        }
        req.user = user;

        next();
    });
};

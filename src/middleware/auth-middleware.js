import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
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
};

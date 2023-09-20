import { ResponseError } from "./response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        return res.status(err.status).json({
            error: err.message,
        });
    } else {
        return res.status(500).json({
            error: err.message,
        });
    }
};

export { errorMiddleware };

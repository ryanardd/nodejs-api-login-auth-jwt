import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        // get data userService
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        // get data

        const result = await userService.login(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const username = req.user.username;
        let request = req.body;
        request.user = username;

        const result = await userService.update(request);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    update,
};

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
        console.info(result);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const request = req.body;

        const result = await userService.update(request);
        console.info(result);
        res.status(200).json({
            data: result,
            message: "data berhasil diperbarui",
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "berhasil logout",
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    update,
    logout,
};

import userService from "../service/user-service.js";

const get = async (req, res, next) => {
    try {
        const user = req.user;

        const result = await userService.get(user);
        console.log(result.token);
        res.status(200).json({
            data: result,
            message: "get data",
        });
    } catch (error) {
        next(error);
    }
};

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
        const data = {
            id: result.id,
            name: result.name,
            username: result.username,
        };
        res.cookie("token", result.token, {
            httpOnly: true,
        });
        res.status(200).json({
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await userService.update(user, request);
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
        res.status(200).clearCookie("token").json({
            message: "berhasil logout",
        });
    } catch (error) {
        next(error);
    }
};

export default {
    get,
    register,
    login,
    update,
    logout,
};

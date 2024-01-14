import {
    getUserValidation,
    loginUserValidation,
    registerUserValidation,
    updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../application/logging.js";

const get = async (user) => {
    user = validate(getUserValidation, user.id);

    const data = await prismaClient.user.findUnique({
        where: {
            id: user,
        },
    });

    if (!data) {
        throw new ResponseError(404, "user is not found");
    }

    return data;
};

const register = async (request) => {
    // lakukan validation schema
    const user = validate(registerUserValidation, request);

    // cek id database
    const countUserId = await prismaClient.user.count({
        where: {
            username: user.username,
        },
    });

    // jika user sudah ada
    if (countUserId === 1) {
        throw new ResponseError(400, "User already exist");
    }

    // lakukan hashing password
    user.password = await bcrypt.hash(user.password, 10);

    // jika user belum ada
    return prismaClient.user.create({
        data: user,
        select: {
            name: true,
            username: true,
            email: true,
        },
    });
};

const login = async (request) => {
    // lakukan validation
    request = validate(loginUserValidation, request);

    // cek db
    const users = await prismaClient.user.findUnique({
        where: {
            username: request.username,
        },
    });

    // jika tidak ada
    if (!users) {
        throw new ResponseError(401, "username or password wrong");
    }

    if (!users.password) {
        throw new ResponseError(404, "Password not se");
    }

    const comparePass = await bcrypt.compare(request.password, users.password);
    // jika tidak cocok
    if (!comparePass) {
        throw new ResponseError(401, "username or password wrong");
    }
    const payload = {
        id: users.id,
        name: users.name,
        username: users.username,
    };

    // akses token
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

    users.token = token;
    return users;
};

const update = async (user, request) => {
    // lakukan validator
    user = validate(getUserValidation, user.id);

    // cek database
    const countUserUpdate = await prismaClient.user.count({
        where: {
            id: user,
        },
    });

    if (countUserUpdate !== 1) {
        throw new ResponseError(404, "User is not found");
    }

    request = validate(updateUserValidation, request);

    // if data ready
    const data = {};
    if (request.username) {
        data.username = request.username;
    }

    if (request.name) {
        data.name = request.name;
    }

    if (request.email) {
        data.email = request.email;
    }

    if (request.password) {
        data.password = await bcrypt.hash(request.password, 10);
    }

    // update data
    return prismaClient.user.update({
        where: {
            id: user,
        },
        data: data,
        select: {
            name: true,
            username: true,
            email: true,
        },
    });
};

export default {
    get,
    register,
    login,
    update,
};

import {
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
        select: {
            username: true,
            password: true,
        },
    });

    // jika tidak ada
    if (!users) {
        throw new ResponseError(401, "username or password wrong");
    }

    const comparePass = await bcrypt.compare(request.password, users.password);
    // jika tidak cocok
    if (!comparePass) {
        throw new ResponseError(401, "username or password wrong");
    }

    // akses token
    const token = jwt.sign(users.username, process.env.ACCESS_TOKEN_SECRET);

    users.token = token;
    return users;
};

const update = async (request) => {
    // lakukan validator
    const user = validate(updateUserValidation, request);

    // cek database
    const countUserUpdate = await prismaClient.user.count({
        where: {
            username: user.username,
        },
    });

    if (countUserUpdate !== 1) {
        throw new ResponseError(404, "Username is not found");
    }

    // if data ready
    const data = {};
    if (user.username) {
        data.username = user.username;
    }

    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    // update data
    return prismaClient.user.update({
        where: {
            username: user.username,
        },
        data: data,
        select: {
            name: true,
            username: true,
        },
    });
};

export default {
    register,
    login,
    update,
};

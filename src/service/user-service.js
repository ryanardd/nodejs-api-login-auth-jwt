import { loginUserValidation, registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../application/logging";

const register = async (request) => {
    // lakukan validation schema
    const user = validate(registerUserValidation, request);

    // cek id database
    const countUserId = await prismaClient.user.count({
        where: {
            id: user.id,
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
            email: true,
        },
    });
};

const login = async (request) => {
    // lakukan validation
    request = validate(loginUserValidation, request);

    // cek db
    const users = await prismaClient.user.findFirst({
        where: {
            id: request.id,
            name: request.name,
        },
        select: {
            id: true,
            name: true,
            password: true,
        },
    });

    console.log(users);
    // jika tidak ada
    if (!users) {
        throw new ResponseError(404, "user is not found");
    }

    const comparePass = await bcrypt.compare(request.password, users.password);
    // jika tidak cocok
    if (!comparePass) {
        throw new ResponseError(401, "name or password wrong");
    }

    // akses token
    const accessToken = jwt.sign(users, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
    });
    const refreshToken = jwt.sign(users, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });

    users.token = refreshToken;
    // update
    return prismaClient.user.update({
        data: {
            token: refreshToken,
        },
        where: {
            id: users.id,
        },
        select: {
            token: true,
        },
    });
};

export default {
    register,
    login,
};

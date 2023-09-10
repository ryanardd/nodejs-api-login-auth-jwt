import { registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";

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

export default { register };

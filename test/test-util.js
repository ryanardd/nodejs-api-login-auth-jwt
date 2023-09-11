import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            name: "test",
        },
    });
};

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            id: 1,
            name: "test",
            password: await bcrypt.hash("rahasia", 10),
            token: "test",
            email: "test@gmail.com",
        },
    });
};

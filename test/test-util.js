import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "usertest",
        },
    });
};

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            id: 1,
            name: "test",
            username: "usertest",
            password: await bcrypt.hash("rahasia", 10),
            email: "test@gmail.com",
        },
    });
};

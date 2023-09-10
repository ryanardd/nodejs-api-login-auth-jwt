import { prismaClient } from "../src/application/database";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            name: "test",
        },
    });
};

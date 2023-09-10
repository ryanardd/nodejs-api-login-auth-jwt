import supertest from "supertest";
import bcrypt from "bcrypt";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { removeTestUser } from "./test-util";

describe("POST /api/users", () => {
    afterEach(async () => {
        await removeTestUser;
    });

    it("should can register new user", async () => {
        const result = await supertest(web).post("/api/users").send({
            name: "test",
            email: "test@gmail.com",
            password: "rahasia",
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.password).toBeUndefined();
    });
});

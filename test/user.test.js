import supertest from "supertest";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createTestUser, removeTestUser } from "./test-util";

describe("POST /api/users", () => {
    afterEach(async () => {
        await removeTestUser();
    });

    it("should can register new user", async () => {
        const result = await supertest(web).post("/api/users").send({
            name: "test",
            username: "usertest",
            email: "test@gmail.com",
            password: "rahasia",
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should reject if request invalid", async () => {
        const result = await supertest(web).post("/api/users").send({
            name: "",
            username: "",
            email: "",
            password: "",
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
    });
});

describe("POST /api/users/login", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can login user", async () => {
        const result = await supertest(web).post("/api/users/login").send({
            username: "usertest",
            password: "rahasia",
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.password).not.toBe("rahasia");
        expect(result.body.data.password).toBeDefined();
        expect(result.body.data.username).toBe("usertest");
    });

    it("should reject login name invalid", async () => {
        const result = await supertest(web).post("/api/users/login").send({
            username: "test1",
            password: "rahasia",
        });

        logger.info(result.body);

        expect(result.status).toBe(401);
    });

    it("should reject login password invalid", async () => {
        const result = await supertest(web).post("/api/users/login").send({
            username: "usertest",
            password: "sadsdd",
        });
        logger.info(result.body);

        expect(result.status).toBe(401);
    });
});

describe("PATCH /api/users/update", () => {
    let authToken;
    beforeEach(async () => {
        // await createTestUser();
        const loginResponse = await supertest(web)
            .post("/api/users/login")
            .send({ username: "usertest", password: "rahasia" }); // Ganti dengan data yang sesuai
        authToken = loginResponse.body.token;

        console.info(loginResponse.body);
    });

    it("should can update data user", async () => {
        // Menggunakan token palsu untuk otentikasi
        const result = await supertest(web)
            .patch("/api/users/update")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                username: "usertest",
                password: "salah",
            });

        console.info(result.body);
        // Memastikan respons berhasil
        expect(result.status).toBe(200);

        // // Memeriksa apakah data pengguna telah diperbarui di database
        // const updatedUser = await prisma.user.findUnique({
        //     where: { id: createdUser.id },
        // });

        // // Membandingkan data yang diperbarui dengan data yang diharapkan
        // expect(updatedUser.username).toBe("newusername");
        // expect(updatedUser.name).toBe("New Name");
    });
});

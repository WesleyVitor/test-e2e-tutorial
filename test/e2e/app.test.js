import {
    jest,
    expect,
    describe,
    test,
    afterEach,
    beforeEach,
} from "@jest/globals";
import superTest from "supertest";
import Server from "../../src/server.js";

describe("API E2E Test Suite", () => {
    let request = null;
    let server = null;

    beforeEach((done) => {
        server = Server.listen(done);
        request = superTest(server);
    });

    afterEach((done) => {
        server.close(done);
    });
    test("GET / - should return an array", async () => {
        const response = await request.get("/");
        const data = JSON.parse(response.text);
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(0);
    });
    test("POST / - should save an item and return ok", async () => {
        const response = await request.post("/").send({
            nome: "Wesley",
            age: 21,
        });

        const expectReturn = { ok: 1 };
        const data = JSON.parse(response.text);
        expect(data).toStrictEqual(expectReturn);
    });

    test("DELETE / - should delete all and return ok", async () => {
        const response = await request.delete("/");
        const data = JSON.parse(response.text);

        const expectReturn = { ok: 1 };

        expect(data).toStrictEqual(expectReturn);
    });
});

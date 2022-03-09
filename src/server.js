import express from "express";
import { randomUUID } from "crypto";

const app = express();
const Database = new Map();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
    response.send(JSON.stringify([...Database]));
});

app.post("/", (request, response) => {
    const body = request.body;
    const id = randomUUID();
    Database.set(id, body);
    response.send({ ok: 1 });
});

app.delete("/", (request, response) => {
    Database.clear();
    response.send({ ok: 1 });
});

export default app;

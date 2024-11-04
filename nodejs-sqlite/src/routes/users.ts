import { Router } from "express";
import { openDb } from "../data/db";
import { randomUUID } from "crypto";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const db = await openDb();
    const users = await db.all("SELECT * FROM users");

    res.json(users);
  } catch (error: any) {
    res.status(400).json(error.message.toString());
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE id = ?", id);

    if (!user) {
      res.status(400).send("No user was found");

      return;
    }

    delete user.password;

    res.json(user);
  } catch (error: any) {
    res.status(400).json(error.message.toString());
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      res
        .status(400)
        .send(
          "Missing one of the required fields: {name, email, phoneNumber, password}"
        );

      return;
    }

    const db = await openDb();

    const emailUsed = await db.get(
      "SELECT 1 FROM users WHERE email = ?",
      email
    );
    if (emailUsed) {
      res.status(400).send("Email has been used");
      return;
    }

    const phoneNumberUsed = await db.get(
      "SELECT 1 FROM users WHERE phoneNumber = ?",
      phoneNumber
    );
    if (phoneNumberUsed) {
      res.status(400).send("Phone number has been used");
      return;
    }

    const id = randomUUID();

    await db.run(
      "INSERT INTO users (id, name, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)",
      [id, name, email, phoneNumber, password]
    );

    res.status(201).send({ id, name, email, phoneNumber, password });
  } catch (error: any) {
    res.status(400).json(error.message.toString());
  }
});

export default router;

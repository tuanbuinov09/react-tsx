import { Router } from "express";
import { openDb } from "../data/db";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE email = ?", email);

    if (!user) {
      res.status(400).send("No user was found");
      return;
    }

    const isPasswordMatched = user.password === password;

    if (!isPasswordMatched) {
      res.status(400).json("Wrong credential");
      return;
    }

    // ** This is our JWT Token
    const token = jwt.sign(
      { id: user?.id, email: user?.email },
      "MY_DUMMY_SECRET",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json(token);
  } catch (error: any) {
    res.status(400).json(error.message.toString());
  }
});

router.post("/auth/sign-up", async (req, res) => {
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

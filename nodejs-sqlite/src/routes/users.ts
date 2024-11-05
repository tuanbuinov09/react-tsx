import { Router } from "express";
import { openDb } from "../data/db";
import { randomUUID } from "crypto";
import jwt, { JwtPayload } from 'jsonwebtoken';

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const db = await openDb();
    const users = await db.all("SELECT * FROM users");

    res.status(200).json({ data: users, isSuccess: true, message: null });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      isSuccess: false,
      message: error.message.toString(),
    });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE id = ?", id);

    if (!user) {
      res.status(400).json({
        data: null,
        isSuccess: false,
        message: "User was not found",
      });
      return;
    }

    delete user.password;

    res.status(200).json({ data: user, isSuccess: true, message: null });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      isSuccess: false,
      message: error.message.toString(),
    });
  }
});

router.get("/users/me/info", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const decoded = jwt.decode(token as string) as JwtPayload | null;

    console.log("decoded:", decoded);
    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE id = ?", decoded?.id);

    if (!user) {
      res.status(400).json({
        data: null,
        isSuccess: false,
        message: "User was not found",
      });
      return;
    }

    delete user.password;

    res.status(200).json({ data: user, isSuccess: true, message: null });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      isSuccess: false,
      message: error.message.toString(),
    });
  }
});


router.post("/users", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      res.status(400).json({
        data: null,
        isSuccess: false,
        message:
          "Missing one of the required fields: {name, email, phoneNumber, password}",
      });

      return;
    }

    const db = await openDb();

    const emailUsed = await db.get(
      "SELECT 1 FROM users WHERE email = ?",
      email
    );
    if (emailUsed) {
      res.status(400).json({
        data: null,
        isSuccess: false,
        message: "Email has been used",
      });
      return;
    }

    const phoneNumberUsed = await db.get(
      "SELECT 1 FROM users WHERE phoneNumber = ?",
      phoneNumber
    );
    if (phoneNumberUsed) {
      res.status(400).json({
        data: null,
        isSuccess: false,
        message: "Phone number has been used",
      });
      return;
    }

    const id = randomUUID();

    await db.run(
      "INSERT INTO users (id, name, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)",
      [id, name, email, phoneNumber, password]
    );

    res.status(201).json({
      data: { id, name, email, phoneNumber, password },
      isSuccess: true,
      message: null,
    });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      isSuccess: false,
      message: error.message.toString(),
    });
  }
});

export default router;

import { Router } from "express";
import { openDb } from "../data/db";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = await openDb();
    const user = await db.get("SELECT * FROM user WHERE email = ?", email);

    if (!user) {
      res
        .status(400)
        .json({ data: null, isSuccess: false, message: "No user was found" });
      return;
    }

    const isPasswordMatched = user.password === password;

    if (!isPasswordMatched) {
      res
        .status(400)
        .json({ data: null, isSuccess: false, message: "Wrong credential" });
      return;
    }
    console.log(process.env.ACCESS_TOKEN_SECRET);

    const token = jwt.sign(
      { id: user?.id, email: user?.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ data: token, isSuccess: true, message: null });
  } catch (error: any) {
    res.status(400).json({
      data: null,
      isSuccess: false,
      message: error.message.toString(),
    });
  }
});

router.post("/auth/sign-up", async (req, res) => {
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

    const emailUsed = await db.get("SELECT 1 FROM user WHERE email = ?", email);
    if (emailUsed) {
      res.status(400).json({
        data: null,
        isSuccess: false,
        message: "Email has been used",
      });
      return;
    }

    const phoneNumberUsed = await db.get(
      "SELECT 1 FROM user WHERE phoneNumber = ?",
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
      "INSERT INTO user (id, name, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)",
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

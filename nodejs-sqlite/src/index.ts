import express from "express";
import usersRouter from "./routes/userManagement.ts";
import authRouter from "./routes/auth";
import { execute } from "./data/sql.ts";
import { db } from "./data/db.ts";
import authentication from "./middlewares/authentication.ts";
import cors from "cors";
import { randomUUID } from "crypto";

require("dotenv").config();

const createDb = async () => {
  try {
    await execute(
      db,
      `CREATE TABLE IF NOT EXISTS user (
          id UNIQUEIDENTIFIER PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phoneNumber TEXT NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL,
          CONSTRAINT email_unique UNIQUE (email),
          CONSTRAINT phoneNumber_unique UNIQUE (phoneNumber))`
    );

    await execute(
      db,
      `INSERT INTO user (id, name, email, phoneNumber, password, role) 
        SELECT '${randomUUID()}', 'admin', 'admin@admin.com', '0000000000', 'admin', 'admin'
          WHERE NOT EXISTS (SELECT 1 FROM user WHERE email = 'admin@admin.com' AND phoneNumber = '0000000000');`
    );
  } catch (error) {
    console.log(error);
  } finally {
    db.close();
  }
};

createDb();

const app = express();
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", authentication, usersRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "myDatabase.db",
    driver: sqlite3.Database,
  });
}

export const db = new sqlite3.Database("myDatabase.db");

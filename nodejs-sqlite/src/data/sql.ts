import sqlite3 from "sqlite3";

export const execute = async (db: sqlite3.Database, sql: any) => {
  return new Promise<void>((resolve, reject) => {
    db.exec(sql, (err: any) => {
      if (err) reject(err);
      resolve();
    });
  });
};

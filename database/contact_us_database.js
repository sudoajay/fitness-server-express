import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//unexpected reserved word 'await'

export async function getNote(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM ContactUsTable
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

export async function createContactUsForm(fullName, email, message) {
  const [result] = await pool.query(
    `
  INSERT INTO ContactUsTable (FullName,Email,Message)
  VALUES (?,?,?)
  `,
    [fullName, email, message]
  );
  const id = result.insertId;
  return getNote(id);
}

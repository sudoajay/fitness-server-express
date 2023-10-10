import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "fitness_plan_database",
  })
  .promise();

//unexpected reserved word 'await'

export async function getNote(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM PaymentFormTable
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

export async function createPaymentForm(
  fullName,
  age,
  email,
  phoneNumber,
  information,

  product,
  amount,
  promoCode,
  referralcode
) {
  const [result] = await pool.query(
    `
  INSERT INTO PaymentFormTable (FullName, Age,Email,PhoneNumber,Information,Product,Amount,PromoCode,Referralcode)
  VALUES (?,?,?,?,?,?,?,?,?)
  `,
    [
      fullName,
      age,
      email,
      phoneNumber,
      information,

      product,
      amount,
      promoCode,
      referralcode,
    ]
  );
  const id = result.insertId;
  return getNote(id);
}

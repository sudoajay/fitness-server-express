import mysql, { raw } from "mysql2";

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

export async function matchPromoCode(promoCode) {
  const [PercentOff] = await pool.query(
    `
    SELECT PercentOff 
    FROM FitnessPromoCode
    WHERE PromoCode = ?
    `,
    [promoCode]
  );

  return PercentOff[0] ? PercentOff[0] : { PercentOff: false };
}

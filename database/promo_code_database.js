const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function matchPromoCode(promoCode) {
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

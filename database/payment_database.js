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

//unexpected reserved word 'await'

async function getNote(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM PaymentTable
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

async function createPayment(
  fullName,
  age,
  email,
  phoneNumber,
  information,
  product,
  amount,
  promoCode,
  referralcode,
  paymentMethod,
  paymentID,
  orderID,
  accessToken
) {
  const [result] = await pool.query(
    `
  INSERT INTO PaymentTable (FullName, Age,Email,PhoneNumber,Information,Product,Amount,PromoCode,Referralcode,PaymentMethod,PaymentID,OrderID,AccessToken)
  VALUES (?,?,
    ?,?,
    ?,?,
    ?,?,
    ?,?,
    ?,?,?)
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
      paymentMethod,
      paymentID,
      orderID,
      accessToken,
    ]
  );
  const id = result.insertId;
  return getNote(id);
}

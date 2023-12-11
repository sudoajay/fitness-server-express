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

async function getPaymentForm(id) {
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

async function createPaymentForm(jsonBody) {
  const [result] = await pool.query(
    `
  INSERT INTO PaymentFormTable (FullName, Age,Email,PhoneNumber,Information,Product,Amount,PromoCode,ReferralCode)
  VALUES (?,?,?,?,?,?,?,?,?)
  `,
    [
      jsonBody.FullName,
      jsonBody.Age,
      jsonBody.Email,
      jsonBody.PhoneNumber,
      jsonBody.Information,
      jsonBody.Product,
      jsonBody.Amount,
      jsonBody.PromoCode,
      jsonBody.ReferralCode,
    ]
  );
  const id = result.insertId;
  return getPaymentForm(id);
}

async function getAllPaymentForm() {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM PaymentFormTable
  `,
    []
  );
  return rows;
}

async function deletePaymentForm(id) {
  const [rows] = await pool.query(
    `
    DELETE FROM PaymentFormTable WHERE id = ?
    `,
    [id]
  );
}

// async function updatePaymentForm(id = 1, jsonBody) {
//   const [result] = await pool.query(
//     `
//     UPDATE PaymentFormTable SET FullName = ? , Age =?   ,Email =? , PhoneNumber =? , Information=? ,Product=?, Amount = ? , PromoCode =? ,ReferralCode=? WHERE id = ?
//       `,
//     [
//       jsonBody.FullName,
//       jsonBody.Age,
//       jsonBody.Email,
//       jsonBody.PhoneNumber,
//       jsonBody.Information,
//       jsonBody.Product,
//       jsonBody.Amount,
//       jsonBody.PromoCode,
//       jsonBody.ReferralCode,
//       id,
//     ]
//   );
// }

async function setPaymentForm(id = 1, jsonBody) {
  const [result] = await pool.query(
    `
    INSERT INTO PaymentFormTable (ID, FullName, Age,Email,PhoneNumber,Information,Product,Amount,PromoCode,ReferralCode)
    VALUES ( ?, ?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE     
    FullName = ? , Age =?   ,Email =? , PhoneNumber =? , Information=? ,Product=?, Amount = ? , PromoCode =? ,ReferralCode=?
  
    
      `,
    [
      id,
      jsonBody.FullName,
      jsonBody.Age,
      jsonBody.Email,
      jsonBody.PhoneNumber,
      jsonBody.Information,
      jsonBody.Product,
      jsonBody.Amount,
      jsonBody.PromoCode,
      jsonBody.ReferralCode,
      jsonBody.FullName,
      jsonBody.Age,
      jsonBody.Email,
      jsonBody.PhoneNumber,
      jsonBody.Information,
      jsonBody.Product,
      jsonBody.Amount,
      jsonBody.PromoCode,
      jsonBody.ReferralCode,
    ]
  );
}
module.exports = {
  createPaymentForm,
  getAllPaymentForm,
  deletePaymentForm,
  setPaymentForm,
};

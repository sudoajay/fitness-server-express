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

async function getFAQDetail(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM FAQDetailTable
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

async function getAllFAQDetail() {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM FAQDetailTable
  `
  );
  return rows;
}

async function updateFAQDetail(jsonBody) {
  const [result] = await pool.query(
    `
    UPDATE FAQDetailTable SET  Question=?, Answer =?  WHERE id = ?

      `,
    [jsonBody.Question, jsonBody.Answer, jsonBody.ID]
  );
  return result[0];
}

async function setNewFAQDetail(jsonBody) {
  const [result] = await pool.query(
    `
    INSERT INTO FAQDetailTable ( Question, Answer)
    VALUES (?,?);
  
      `,
    [jsonBody.Question, jsonBody.Answer]
  );
  return result[0];
}

async function deleteFAQ(id) {
  const [rows] = await pool.query(
    `
    DELETE FROM FAQDetailTable WHERE id = ?
    `,
    [id]
  );
}
module.exports = {
  setNewFAQDetail,
  updateFAQDetail,
  deleteFAQ,
  getAllFAQDetail,
};

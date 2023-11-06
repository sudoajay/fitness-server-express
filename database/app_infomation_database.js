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

async function getAppInformation(id = 1) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM AppInformationTable
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

// async function createPayment(jsonBody) {
//   const [result] = await pool.query(
//     `
//   INSERT INTO PaymentTable (AppTitle, AppDescription,AppKeywords,MainTitle,MainDescription)
//   VALUES (?,?,
//     ?,?,
//     ?)
//   `,
//     [
//       jsonBody.AppTitle,
//       jsonBody.AppDescription,
//       jsonBody.AppKeywords,
//       jsonBody.MainTitle,
//       jsonBody.MainDescription,
//     ]
//   );
//   const id = result.insertId;
//   return getItemDetail(id);
// }

// async function setAppInformation(id = 1, jsonBody) {
//   const [result] = await pool.query(
//     `
//   UPDATE AppInformationTable SET AppTitle = ? , AppDescription =?   ,AppKeywords =? , MainTitle =? , MainDescription=? WHERE id = ?
//   `,
//     [
//       jsonBody.AppTitle,
//       jsonBody.AppDescription,
//       jsonBody.AppKeywords,
//       jsonBody.MainTitle,
//       jsonBody.MainDescription,
//       id,
//     ]
//   );
// }

async function setAppInformation(id = 1, jsonBody) {
  const [result] = await pool.query(
    `
    INSERT INTO AppInformationTable ( ID,AppTitle, AppDescription,AppKeywords,MainTitle,MainDescription)
    VALUES ( ?, ?,?,?,?,?) ON DUPLICATE KEY UPDATE    
    AppTitle=?, AppDescription =? , AppKeywords=?, MainTitle=?,MainDescription=?
  
    
      `,
    [
      id,
      jsonBody.AppTitle,
      jsonBody.AppDescription,
      jsonBody.AppKeywords,
      jsonBody.MainTitle,
      jsonBody.MainDescription,
      jsonBody.AppTitle,
      jsonBody.AppDescription,
      jsonBody.AppKeywords,
      jsonBody.MainTitle,
      jsonBody.MainDescription,
    ]
  );
}
module.exports = { getAppInformation, setAppInformation };

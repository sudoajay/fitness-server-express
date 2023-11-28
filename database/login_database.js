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

async function matchLoginDetail(jsonBody) {
  const [Role] = await pool.query(
    `
    SELECT Role 
    FROM LoginDetailTable
    WHERE BINARY UserName = ? And BINARY PassWord = ?
    `,
    [jsonBody.UserName, jsonBody.Password]
  );

  return Role[0] ? { LoginMatch: true, Role: Role[0] } : { LoginMatch: false };
}

async function getUserInfo(UserName) {
  const [Info] = await pool.query(
    `
    SELECT * 
    FROM LoginDetailTable
    WHERE BINARY UserName = ? 
    `,
    [UserName]
  );

  return Info[0] ? Info[0] : { Info: "Something Went Wrong" };
}

async function getAllUserInfo() {
  const [Info] = await pool.query(
    `
    SELECT * 
    FROM LoginDetailTable
    `
  );

  return Info;
}

async function updateUserInfo(jsonBody) {
  const [result] = await pool.query(
    `
    UPDATE LoginDetailTable SET UserName = ? ,PassWord=?, Role=?, Status =?   ,PromoCode =? , PercentOff =? , Name=? , Country=?, Email=? , Image=? , Phone=? , Gender=? WHERE id = ?

      `,
    [
      jsonBody.UserName,
      jsonBody.PassWord,
      jsonBody.Role,
      jsonBody.Status,
      jsonBody.PromoCode,
      jsonBody.PercentOff,
      jsonBody.Name,
      jsonBody.Country,
      jsonBody.Email,
      jsonBody.Image,
      jsonBody.Phone,
      jsonBody.Gender,
      jsonBody.ID,
    ]
  );
  return result[0];
}

async function setNewUserInfo(jsonBody) {
  const [result] = await pool.query(
    `
    INSERT INTO LoginDetailTable (UserName, PassWord,Role,Status,PromoCode,PercentOff,Name,Country,Email,Image,Phone,Gender)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?);
  
      `,
    [
      jsonBody.UserName,
      jsonBody.PassWord,
      jsonBody.Role,
      jsonBody.Status,
      jsonBody.PromoCode,
      jsonBody.PercentOff,
      jsonBody.Name,
      jsonBody.Country,
      jsonBody.Email,
      jsonBody.Image,
      jsonBody.Phone,
      jsonBody.Gender,
      jsonBody.ID,
    ]
  );
  return result[0];
}

async function deleteUser(id) {
  const [rows] = await pool.query(
    `
    DELETE FROM LoginDetailTable WHERE id = ?
    `,
    [id]
  );
}
module.exports = {
  matchLoginDetail,
  getUserInfo,
  updateUserInfo,
  getAllUserInfo,
  setNewUserInfo,
  deleteUser,
};

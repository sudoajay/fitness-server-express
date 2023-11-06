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

async function getItemDetail(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM ItemDetailTable
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

async function setItemDetail(id, jsonBody) {
  const [result] = await pool.query(
    `
    INSERT INTO ItemDetailTable ( ID,ItemSlug, ItemTitle,ItemDescription,ItemAmount,ItemPrice,ItemMainImage,ItemImages )
    VALUES ( ?, ?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE    
    ItemSlug=?, ItemTitle =? , ItemDescription=?, ItemAmount=?,ItemPrice=?, ItemMainImage=? ,ItemImages=?
      `,
    [
      id,
      jsonBody.ItemSlug,
      jsonBody.ItemTitle,
      jsonBody.ItemDescription,
      jsonBody.ItemAmount,
      jsonBody.ItemPrice,
      jsonBody.ItemMainImage,
      jsonBody.ItemImages,
      jsonBody.ItemSlug,
      jsonBody.ItemTitle,
      jsonBody.ItemDescription,
      jsonBody.ItemAmount,
      jsonBody.ItemPrice,
      jsonBody.ItemMainImage,
      jsonBody.ItemImages,
    ]
  );
  return getItemDetail(id);
}

async function getTotalItem() {
  const [rows] = await pool.query(
    `
    SELECT  COUNT(*) AS Count
  FROM ItemDetailTable
  
  `
  );
  return rows[0];
}
module.exports = { getItemDetail, setItemDetail, getTotalItem };

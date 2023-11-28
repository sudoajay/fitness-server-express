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

async function getAllItemDetail() {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM ItemDetailTable
 
  `
  );
  return rows;
}

// async function setItemDetail(id, jsonBody) {
//   const [result] = await pool.query(
//     `
//     INSERT INTO ItemDetailTable ( ID,ItemSlug, ItemTitle,ItemDescription,ItemAmount,ItemPrice,ItemMainImage,ItemImages )
//     VALUES ( ?, ?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE
//     ItemSlug=?, ItemTitle =? , ItemDescription=?, ItemAmount=?,ItemPrice=?, ItemMainImage=? ,ItemImages=?
//       `,
//     [
//       id,
//       jsonBody.ItemSlug,
//       jsonBody.ItemTitle,
//       jsonBody.ItemDescription,
//       jsonBody.ItemAmount,
//       jsonBody.ItemPrice,
//       jsonBody.ItemMainImage,
//       jsonBody.ItemImages,
//       jsonBody.ItemSlug,
//       jsonBody.ItemTitle,
//       jsonBody.ItemDescription,
//       jsonBody.ItemAmount,
//       jsonBody.ItemPrice,
//       jsonBody.ItemMainImage,
//       jsonBody.ItemImages,
//     ]
//   );
//   return getItemDetail(id);
// }

async function updateItemDetail(jsonBody) {
  const [result] = await pool.query(
    `
    UPDATE ItemDetailTable SET ItemSlug=?, ItemTitle =? , ItemDescription=?, ItemAmount=?,ItemPrice=?, ItemMainImage=? ,ItemImages=?  WHERE id = ?

      `,
    [
      jsonBody.ItemSlug,
      jsonBody.ItemTitle,
      jsonBody.ItemDescription,
      jsonBody.ItemAmount,
      jsonBody.ItemPrice,
      jsonBody.ItemMainImage,
      jsonBody.ItemImages,
      jsonBody.ID,
    ]
  );
  return result[0];
}

async function setNewItemDetail(jsonBody) {
  const [result] = await pool.query(
    `
    INSERT INTO ItemDetailTable ( ItemSlug, ItemTitle,ItemDescription,ItemAmount,ItemPrice,ItemMainImage,ItemImages )
    VALUES (  ?,?,?,?,?,?,?)
  
      `,
    [
      jsonBody.ItemSlug,
      jsonBody.ItemTitle,
      jsonBody.ItemDescription,
      jsonBody.ItemAmount,
      jsonBody.ItemPrice,
      jsonBody.ItemMainImage,
      jsonBody.ItemImages,
    ]
  );
  return result[0];
}

async function deleteItem(id) {
  const [rows] = await pool.query(
    `
    DELETE FROM ItemDetailTable WHERE id = ?
    `,
    [id]
  );
}
module.exports = {
  getItemDetail,
  deleteItem,
  getAllItemDetail,
  updateItemDetail,
  setNewItemDetail,
};

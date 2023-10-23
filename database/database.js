const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "notes_app",
  })
  .promise();

//unexpected reserved word 'await'

export async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");

  return rows;
}

// const notes = await Promise.resolve(getNotes());
// console.log(notes);

export async function getNote(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM notes
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}

// const note = await getNote(1);
// console.log(note);

export async function createNote(title, contents) {
  const [result] = await pool.query(
    `
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `,
    [title, contents]
  );
  const id = result.insertId;
  return getNote(id);
}

export async function deleteNote(id) {
  const [result] = await pool.query(
    `
  DELETE 
  FROM notes 
  WHERE id=? 
  `,
    [id]
  );

  return `Id  ${id} deleted`;
}

export async function updateNote(id, title, contents) {
  const [result] = await pool.query(
    `
    UPDATE notes
    SET title =?, contents =?
    WHERE id=? ; 
  `,
    [title, contents, id]
  );

  return getNote(id);
}

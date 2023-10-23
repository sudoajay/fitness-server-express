const express = require("express");
const app = express();

const createPaymentForm = require("./database/payment_form_database.js");
const createContactUsForm = require("./database/contact_us_database.js");
const matchPromoCode = require("./database/promo_code_database.js");
const createPayment = require("./database/payment_database.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!!" });

  // res.send("Hello World!!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World  api !!" });
  // res.send("Hello World api!!");
});

// app.get("/api/notes", async (req, res) => {
//   const notes = await getNotes();
//   res.send(notes);
// });

// app.get("/api/notes/:id", async (req, res) => {
//   const id = req.params.id;
//   const note = await getNote(id);
//   res.send(note);
// });

// app.post("/api/notes", async (req, res) => {
//   const { title, contents } = req.body;
//   const note = await createNote(title, contents);
//   res.status(201).send(note);
// });

// app.delete("/api/notes/:id", async (req, res) => {
//   const id = req.params.id;
//   const note = await deleteNote(id);
//   res.status(201).send(note);
// });

// app.put("/api/notes/:id", async (req, res) => {
//   const id = req.params.id;

//   const { title, contents } = req.body;
//   const note = await updateNote(id, title, contents);
//   res.status(206).send(note);
// });

// app.get("/api/paymentForm/:id", async (req, res) => {
//   const id = req.params.id;

//   const note = await updateNote(id, title, contents);
//   res.status(206).send(note);
// });

app.post("/api/paymentForm", async (req, res) => {
  const {
    FullName,
    Age,
    Email,
    PhoneNumber,
    Information,
    Product,
    Amount,
    PromoCode,
    Referralcode,
  } = req.body;
  const data = await createPaymentForm(
    FullName,
    Age,
    Email,
    PhoneNumber,
    Information,
    Product,
    Amount,
    PromoCode,
    Referralcode
  );
  res.json(true);
});

app.post("/api/payment", async (req, res) => {
  const {
    FullName,
    Age,
    Email,
    PhoneNumber,
    Information,
    Product,
    Amount,
    PromoCode,
    Referralcode,
    PaymentMethod,
    PaymentID,
    OrderID,
    AccessToken,
  } = req.body;
  const data = await createPayment(
    FullName,
    Age,
    Email,
    PhoneNumber,
    Information,
    Product,
    Amount,
    PromoCode,
    Referralcode,
    PaymentMethod,
    PaymentID,
    OrderID,
    AccessToken
  );
  res.json(true);
});
app.get("/api/promocode/:promo", async (req, res) => {
  const promo = req.params.promo;
  const output = await matchPromoCode(promo);
  res.json(output);
});

app.post("/api/contact", async (req, res) => {
  const { FullName, Email, Message } = req.body;
  const data = await createContactUsForm(FullName, Email, Message);
  res.json(data);
});

app.post("/api/login", async (req, res) => {});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("seomthing broke");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

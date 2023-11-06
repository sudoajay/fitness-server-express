const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const sharp = require("sharp");
const createPaymentForm = require("./database/payment_form_database.js");
const createContactUsForm = require("./database/contact_us_database.js");
const matchPromoCode = require("./database/promo_code_database.js");
const createPayment = require("./database/payment_database.js");
const move = require("./fileHandling.js");

const {
  getAppInformation,
  setAppInformation,
} = require("./database/app_infomation_database.js");

const {
  getItemDetail,
  setItemDetail,
  getTotalItem,
} = require("./database/item_detail_database.js");

app.use(express.json());
app.use(cors());

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("uploads", { recursive: true });
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// Multer Configuration

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    var ext = file.originalname.split(".").pop();
    if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "webp") {
      return callback(new Error("Only PNG, JPG, JPEG, WebP. Supported"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

// // Add headers before the routes are defined
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.get("/", (req, res) => {
  res.json({ message: "Hello World!!" });

  // res.send("Hello World!!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World  api as !!" });
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

app.get("/api/app-information", async (req, res) => {
  const output = await getAppInformation();
  res.status(200).json({
    ID: output.ID,
    AppTitle: output.AppTitle,
    AppDescription: output.AppDescription,
    AppKeywords: output.AppKeywords,
    MainTitle: output.MainTitle,
    MainDescription: output.MainDescription,
    Created: output.Created,
  });
});

// app.post("/api/set-app-information", async (req, res) => {
//   const output = await setAppInformation(1, req.body);
//   res.json(true);
// });

app.post("/api/set-app-information", async (req, res) => {
  console.log("  data " + JSON.stringify(req.body));
  const output = await setAppInformation(1, req.body);
  res.status(200).json(true);
});

app.post("/api/single/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  var ext = req.file.originalname.split(".").pop();
  var filename = req.file.originalname.split(".")[0];

  let newDir = req.file.destination + "/" + req.body.number;

  fs.mkdir(newDir, { recursive: true }, (err) => {
    if (err) return res.status(400).json({ error: "Mkdir Error" });
    else {
      fs.rename(req.file.path, newDir + "/" + req.file.filename, (err) => {
        if (err) return res.status(400).json({ error: "Rename Error" });
        else {
          sharp(newDir + "/" + req.file.filename).toFile(
            newDir + "/" + "mainImage" + ".webp",
            (err, info) => {
              if (req.file.filename != "mainImage.webp") {
                fs.unlink(newDir + "/" + req.file.filename, (err) => {
                  if (err)
                    return res
                      .status(400)
                      .json({ error: "Cant Delte original File" });
                });
              }
            }
          );
        }
      });
    }
  });

  res.status(200).json({
    message: "File uploaded successfully",
    filePath: newDir + "/" + filename + ".webp",
    fileName: filename + ".webp",
    originalFileName: req.file.originalname,
  });
});

app.post("/api/multiple/upload", upload.array("files", 8), (req, res) => {
  if (!req.files) {
    return res.status(400).json(JSON.stringify(req.files));
  }

  req.files.map((file, index) => {
    var ext = file.originalname.split(".").pop();
    var filename = file.originalname.split(".")[0];

    let newDir = file.destination + "/" + req.body.number;

    fs.mkdir(newDir, { recursive: true }, (err) => {
      if (err) return res.status(400).json({ error: "Mkdir Error" });
      else {
        fs.rename(file.path, newDir + "/" + file.filename, (err) => {
          if (err) return res.status(200).json({ message: "ok" });
          else {
            sharp(newDir + "/" + file.filename).toFile(
              newDir + "/" + (index + 1) + ".webp",
              (err, info) => {
                if (file.originalname != index + 1 + ".webp") {
                  fs.unlink(newDir + "/" + file.filename, (err) => {
                    if (err)
                      return res
                        .status(400)
                        .json({ error: "Cant Delte original File" });
                  });
                }
              }
            );
          }
        });
      }
    });
  });

  res.status(200).json({
    message: " Multiple file uploaded successfully",
    file: JSON.stringify(req.files),
  });
});

app.get("/api/get/item/:item", async (req, res) => {
  const item = req.params.item;
  const output = await getItemDetail(item);
  if (output === undefined) {
    res.status(200).json(false);
  } else {
    res.status(200).json({
      ID: output.ID,
      ItemSlug: output.ItemSlug,
      ItemTitle: output.ItemTitle,
      ItemDescription: output.ItemDescription,
      ItemAmount: output.ItemAmount,
      ItemPrice: output.ItemPrice,
      ItemMainImage: output.ItemMainImage,
      ItemImages: output.ItemImages,
      Created: output.Created,
    });
  }
});

app.post("/api/set/item/:item", async (req, res) => {
  const item = req.params.item;
  const output = await setItemDetail(item, req.body);
  res.json(true);
});

app.get("/api/total/item/", async (req, res) => {
  const output = await getTotalItem();
  res.status(200).json(output);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("seomthing broke");
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));

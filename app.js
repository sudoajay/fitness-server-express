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
const {
  matchLoginDetail,
  getUserInfo,
  getAllUserInfo,
  setNewUserInfo,
  updateUserInfo,
  deleteUser,
} = require("./database/login_database.js");

const {
  getAppInformation,
  setAppInformation,
} = require("./database/app_infomation_database.js");
const session = require("express-session");

const {
  getItemDetail,
  deleteItem,
  getAllItemDetail,
  updateItemDetail,
  setNewItemDetail,
} = require("./database/item_detail_database.js");

const {
  setNewFAQDetail,
  updateFAQDetail,
  deleteFAQ,
  getAllFAQDetail,
} = require("./database/faq_detail_database.js");

app.use(express.json());
// Use cors middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // enable set cookie with CORS
  })
);
// const sessionStorage = MongoStore.create({
//   mongoUrl: "mongodb://localhost:27017",
//   dbName: "dbname",
//   session: "sessionDb",
//   autoRemove: "native",
//   ttl: 14 * 24 * 60 * 60, // = 14 days. Default
// });

app.use(
  session({
    name: "testing",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,

    cookie: { secure: false }, // 1 day }, // Set secure to false if not using HTTPS in development
  })
);

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
    if (
      ext !== "svg" &&
      ext !== "png" &&
      ext !== "jpg" &&
      ext !== "jpeg" &&
      ext !== "webp"
    ) {
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
  const data = await createPaymentForm(req.body);
  res.json(true);
});

app.post("/api/payment", async (req, res) => {
  const data = await createPayment(req.body);
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

app.get("/api/get/app/information", async (req, res) => {
  const output = await getAppInformation();
  res.status(200).json(output);
});

// app.post("/api/set-app-information", async (req, res) => {
//   const output = await setAppInformation(1, req.body);
//   res.json(true);
// });

app.put("/api/set/app/information", async (req, res) => {
  const output = await setAppInformation(1, req.body);
  res.status(200).json(true);
});

app.post("/api/app/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  var ext = req.file.originalname.split(".").pop();
  let newDir = req.file.destination + "/app";

  fs.mkdir(newDir, { recursive: true }, (err) => {
    if (err) return res.status(400).json({ error: "Mkdir Error" });
    else {
      if (ext == "svg") {
        ext = "png";
        sharp(req.file.path).toFile(
          newDir + "/icon." + "png",
          (err, info) => {}
        );
      }

      sharp(req.file.path)
        .resize(16, 16)
        .toFile(newDir + "/icon-16x16." + ext, (err, info) => {});
      sharp(req.file.path)
        .resize(32, 32)
        .toFile(newDir + "/icon-32x32." + ext, (err, info) => {});
      sharp(req.file.path)
        .resize(70, 70)
        .toFile(newDir + "/icon-70x70." + ext, (err, info) => {});
      sharp(req.file.path)
        .resize(144, 144)
        .toFile(newDir + "/icon-144x144." + ext, (err, info) => {});
      sharp(req.file.path)
        .resize(150, 150)
        .toFile(newDir + "/icon-150x150." + ext, (err, info) => {});
      sharp(req.file.path)
        .resize(180, 180)
        .toFile(newDir + "/apple-icon." + ext, (err, info) => {});
      sharp(req.file.path)
        .resize(192, 192)
        .toFile(newDir + "/icon-192x192." + ext, (err, info) => {});
      sharp(req.file.path)
        .resize(512, 512)
        .toFile(newDir + "/icon-512x512." + ext, (err, info) => {});
      sharp(req.file.path)
        .resize(48, 48)
        .toFile(newDir + "/favicon.ico", (err, info) => {
          fs.rename(
            req.file.path,
            newDir + "/icon." + req.file.originalname.split(".")[1],
            (err) => {}
          );
        });
    }
  });

  res.status(200).json({
    message: "App Icon uploaded successfully",
    filePath: newDir + "/icon." + ext,
    fileName: "icon." + ext,
    originalFileName: req.file.originalname,
  });
});

app.post("/api/single/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(200).json({ error: "No file uploaded" });
  }
  var filename = req.file.originalname.split(".")[0];

  let newDir = req.file.destination + "/item/" + req.body.number;

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
    filePath: newDir + "/" + "mainImage.webp",
    fileName: "mainImage.webp",
    originalFileName: req.file.originalname,
  });
});

app.post("/api/multiple/upload", upload.array("files", 8), (req, res) => {
  if (!req.files) {
    return res.status(200).json({ error: "No file uploaded" });
  }

  req.files.map((file, index) => {
    let newDir = file.destination + "/item/" + req.body.number;

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
    totalFile: req.files.length,
  });
});

app.post("/api/account/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  var ext = req.file.originalname.split(".")[1];

  let newDir = req.file.destination + "/user/" + req.body.number;

  fs.mkdir(newDir, { recursive: true }, (err) => {
    if (err) return res.status(400).json({ error: "Mkdir Error" });
    else {
      fs.rename(req.file.path, newDir + "/ProfileImage." + ext, (err) => {
        if (err) return res.status(400).json({ error: "Rename Error" });
        else {
        }
      });
    }
  });

  res.status(200).json({
    message: "Profile Icon File uploaded successfully",
    filePath: newDir + "/ProfileImage." + ext,
    fileName: req.file.originalname,
    originalFileName: req.file.originalname,
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

app.get("/api/get/all/item/", async (req, res) => {
  const output = await getAllItemDetail();
  let data = [];
  output.map((v, i) => {
    let arr = [];
    v.ItemImages.split("),(").map((value, Index) => {
      let size = String(value.split(" - ")[1]).replace(")", "");
      arr.push(Index + 1 + ".webp" + " - " + size);
    });
    if (arr.length == 0) {
      let size = String(v.ItemImages.split(" - ")[1]).replace(")", "");
      arr.push("1.webp" + " - " + size);
    }

    let object = {
      ID: v.ID,
      ItemSlug: v.ItemSlug,
      ItemTitle: v.ItemTitle,
      ItemDescription: v.ItemDescription,
      ItemAmount: v.ItemAmount,
      ItemPrice: v.ItemPrice,
      ItemMainImage: v.ItemMainImage,
      ItemImages: arr,
      Created: v.Created,
    };

    data.push(object);
  });
  console.log(data);
  res.status(200).json(data);
});

app.get("/api/get/all/item/1", async (req, res) => {
  const output = await getAllItemDetail();
  let data = [];
  output.map((v, i) => {
    let arr = [];
    arr.push(v.ItemMainImage);
    v.ItemImages.split("),(").map((value, Index) => {
      arr.push(Index + 1 + ".webp");
    });
    if (arr.length == 1) {
      arr.push("1.webp");
    }

    let object = {
      id: v.ID,
      slug: v.ItemSlug,
      title: v.ItemTitle,
      description: v.ItemDescription,
      price: v.ItemAmount,
      rupess: v.ItemPrice,
      mainImage: v.ItemMainImage,
      images: arr,
      created: v.Created,
    };

    data.push(object);
  });
  console.log(data);
  res.status(200).json(data);
});

app.put("/api/set/update/item", async (req, res) => {
  console.log(req.body);
  await updateItemDetail(req.body);
  res.status(200).json(true);
});

app.post("/api/set/new/item", async (req, res) => {
  await setNewItemDetail(req.body);
  res.status(200).json(true);
});

// app.get("/api/total/item/", async (req, res) => {
//   const output = await getTotalItem();
//   res.status(200).json(output);
// });

app.delete("/api/delete/item/:item", async (req, res) => {
  const item = req.params.item;
  await deleteItem(item);

  fs.rmdir("uploads/item/" + item, { recursive: true, force: true }, (err) => {
    if (err) return res.status(400).json({ error: "Cant Delte original File" });
  });

  res.status(200).json(true);
});

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    // User is logged in
    next();
  } else {
    // User is not logged in
    res.status(401).json({ CheckLogin: false });
  }
};
// Example of using the middleware for a protected route
app.get("/api/admin/check/login", checkAuth, async (req, res) => {
  // Code for the protected route
  res.json({
    CheckLogin: true,
  });
});

app.post(
  "/api/admin/login",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    // login logic to validate req.body.user and req.body.pass
    // would be implemented here. for this example any combo works

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation

    const output = await matchLoginDetail(req.body);

    req.session.regenerate(function (err) {
      if (err) next(err);

      if (output.LoginMatch) {
        // store user information in session, typically a user id
        if (req.body.RememberMe)
          req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 14;
        req.session.user = req.body.UserName;
      }
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err);
        res.json(output);
      });
    });
  }
);

app.get("/api/admin/logout", async (req, res) => {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.json(` logout    ${req.session.user}`);
    });
  });
});

app.get("/api/admin/get/user", async (req, res) => {
  const output = await getUserInfo("sudo");
  res.status(200).json(output);
});
app.get("/api/admin/get/all/user", async (req, res) => {
  const output = await getAllUserInfo();
  res.status(200).json(output);
});

app.put("/api/admin/update/user", async (req, res) => {
  await updateUserInfo(req.body);
  res.status(200).json(true);
});

app.post("/api/admin/set/new/user", async (req, res) => {
  await setNewUserInfo(req.body);
  res.status(200).json(true);
});

app.delete("/api/admin/delete/user/:id", async (req, res) => {
  const ID = req.params.id;

  await deleteUser(ID);

  fs.rmdir("uploads/user/" + item, { recursive: true, force: true }, (err) => {
    if (err) return res.status(400).json({ error: "Cant Delte original File" });
  });

  res.status(200).json(true);
});

app.get("/api/get/all/faq", async (req, res) => {
  const output = await getAllFAQDetail();

  res.status(200).json(output);
});

app.put("/api/set/update/faq", async (req, res) => {
  await updateFAQDetail(req.body);
  res.status(200).json(true);
});

app.post("/api/set/new/faq", async (req, res) => {
  await setNewFAQDetail(req.body);
  res.status(200).json(true);
});

app.delete("/api/delete/faq/:id", async (req, res) => {
  const ID = req.params.id;

  await deleteFAQ(ID);

  res.status(200).json(true);
});

app.use((err, req, res, next) => {
  res.status(500).send("seomthing broke");
});

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Listening on port ${port}`));

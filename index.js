const express = require("express");
const app = express();
require("@babel/register");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const dbCheck = require("./db/dbCheck");
dbCheck();

const authRouter = require("./routes/authRouter");
const tasksRouter = require("./routes/tasksRouter");

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.static(path.resolve("public")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  name: "sid",
  store: new FileStore({}),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  console.log("\n\x1b[33m", "req.session.user :", req.session?.user);
  res.locals.username = req.session?.user?.name;
  next();
});

app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

const PORT = process.env.PORT || 3100;
app.listen(PORT, (err) => {
  if (err) return console.log("Ошибка запуска сервера.", err.message);
  console.log(`Сервер запущен на http://localhost:${PORT} `);
});

//#region imports

const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/db.js");
const path = require("path");
require("dotenv").config();
const passport = require("passport");

const initializePassport = require("./config/passportSetup.js");

//#endregion

const port = process.env.PORT || 5000;
const app = express();
initializePassport(passport);
db();
app.use(compression());
app.use(helmet());
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use(passport.initialize()); // Used to initialize passport

const bookRouter = require("./routes/book.js");

const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js");
const adminRouter = require("./routes/admin.js");

app.use("/", bookRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/auth", authRouter);

app.use("/public", express.static(path.resolve("public")));
app.get("/", (req, res) => {
  const responseMessage = "Hello world\n"; // "\n" yeni satır ekler
  res.send(responseMessage);
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port ${port}`));

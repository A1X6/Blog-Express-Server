const express = require("express");
const path = require("path");
const appRouter = require("./routes/index.js");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
const csrf = require("csurf");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const redisClient = require("./config/redisClient.js");

const secretKey = crypto.randomBytes(32).toString("hex");

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "Blog:",
});

app.use(
  session({
    store: redisStore,
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS in production
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use("/api", appRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

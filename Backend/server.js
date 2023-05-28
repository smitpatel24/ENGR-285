const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");
const winston = require("winston");
const winstonmongodb = require("winston-mongodb");
const uri =
  "mongodb+srv://smitmongodb24:mongodb24@cluster-engr-285.a6ygl9n.mongodb.net/?retryWrites=true&w=majority";

// smitmongodb24;
// mongodb24;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to each log entry
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "systemlog.log" }),
    new winstonmongodb.MongoDB({
      level: "info", // Log level for the transport
      db: uri, // MongoDB connection URI
      collection: "logs", // Collection name to store logs
      options: { useUnifiedTopology: true }, // MongoDB connection options
    }),
  ],
});

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => logger.error(error));
db.once("open", () => {
  logger.info("Connected to Database");
});

app.use(cors());
app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "THESECRETISINPLAINSIGHT",
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(3000, () => {
  logger.info("Server Started");
});

module.exports = app;

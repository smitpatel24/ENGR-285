const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
jsonwebtoken = require("jsonwebtoken");
// smitmongodb24;
// mongodb24;

const uri =
  "mongodb+srv://smitmongodb24:mongodb24@cluster-engr-285.a6ygl9n.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

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

app.listen(3000, () => console.log("Server Started"));

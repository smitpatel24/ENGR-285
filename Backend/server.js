const express = require("express");
const app = express();
const mongoose = require("mongoose");
// smitmongodb24;
// mongodb24;

const uri =
  "mongodb+srv://smitmongodb24:mongodb24@cluster-engr-285.a6ygl9n.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(3000, () => console.log("Server Started"));

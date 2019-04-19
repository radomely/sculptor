require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");

const router = require("./routes/routes.js");

mongoose
  .connect(process.env.URL_MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log("MangoDB connected...");
    },
    err => {
      console.log(err);
    }
  );

app.use(logger("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Bring in defined Passport Strategy
require("./modules/passport")(passport);

swaggerDoc(app);

app.use("/", express.static("public"));

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server start on ${process.env.PORT} port`);
});

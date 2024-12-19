const mongoose = require("mongoose");
require("dotenv").config();
const mongo_url = process.env.MONGODB_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch(() => {
    console.log("DB not connected");

    console.error();
  });

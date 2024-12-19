const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/db");
const AuthRouter = require("./routes/AuthRouter");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
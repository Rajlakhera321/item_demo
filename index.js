const express = require("express");
const { connection } = require("./src/config/db");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
connection();

app.use(cors());
app.use("/api/v1", require("./src/router/item"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
const express = require("express");
const auth = require("../router/auth_router.js");
const service = require("../router/services.router.js");
const { db } = require("../db/db_postgres.js");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(cors());

dotenv.config();

db.connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error", err.stack));

app.use(express.json());
app.use("/auth", auth);
app.use("/service", service);

app.listen(4000, () => {
  console.log("estamos en el puesto 4000");
});

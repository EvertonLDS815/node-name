require("dotenv").config();
const connetToDb = require("./database/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 300;
const cors = require("cors");

app.use(express.json());
app.use(cors());
const Portifolio = require("./model/portifolio");

connetToDb();

app.get("/", async (req, res) => {
  const ports = await Portifolio.find();
  res.json(ports);
});

app.post("/ins", async (req, res) => {
  const newPort = req.body;
  await Portifolio.create(newPort);

  res.status(201).json(newPort);
});

app.listen(port, () => console.log(`🚀 Meu site http://localhost:${port}`));

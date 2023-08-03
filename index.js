require("dotenv").config();
const connetToDb = require("./database/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 300;
const cors = require("cors");

app.use(express.json());
app.use(cors());
const Pessoa = require("./model/pessoa");

connetToDb();

app.get("/", async (req, res) => {
  const pessoas = await Pessoa.find();
  res.json(pessoas);
});

app.post("/ins", async (req, res) => {
  const newUser = req.body;
  await Pessoa.create(newUser);

  res.status(201).json(newUser);
});

app.listen(port, () => console.log(`🚀 Meu site http://localhost:${port}`));

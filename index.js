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

app.put("/update/:id", async (req, res) => {
  const {id} = req.params;

  const {name, description, linkSite, imagePath} = req.body;
  await Portifolio.findByIdAndUpdate(id, {
    name,
    description,
    linkSite,
    imagePath
  });

  res.sendStatus(204);
});

app.delete("/delete/:id", async (req, res) => {
  const {id} = req.params;
  await Portifolio.findByIdAndUpdate(id);

  res.sendStatus(204);
});

app.listen(port, () => console.log(`🚀 Meu site http://localhost:${port}`));

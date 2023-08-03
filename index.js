require("dotenv").config();
const connetToDb = require("./database/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 300;
const cors = require("cors");

app.use(express.json());
app.use(cors());
const Product = require("./model/product");

connetToDb();

app.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/ins", async (req, res) => {
  const newProduct = req.body;
  await Product.create(newProduct);

  res.status(201).json(newProduct);
});

app.listen(port, () => console.log(`🚀 Meu site http://localhost:${port}`));

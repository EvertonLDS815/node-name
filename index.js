require("dotenv").config();
const connetToDb = require("./database/db");
const multer = require("multer");
const path = require("node:path");

const express = require("express");
const app = express();
const port = process.env.PORT || 300;
const cors = require("cors");

const Portifolio = require("./model/portifolio");
app.use(cors());

connetToDb();
app.use(
  '/files',
  express.static(path.resolve(__dirname, '.', 'uploads')),
  );
  
app.use(express.json());
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
			callback(null, path.resolve(__dirname, '.', 'uploads'));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		},
	}),
});

app.get("/", async (req, res) => {
  const ports = await Portifolio.find();
  return res.json(ports);
});
app.post("/ins", upload.single('image'), async (req, res) => {
	const {name, description, linkSite, imagePath} = req.body;
	console.log(req.headers)
	// const imagePath = req.file?.filename;
	const port = await Portifolio.create({
	name,
	description,
	linkSite,
	imagePath
	// imagePath: `https://node-name.vercel.app/files/${imagePath}`
	});
  
    return res.status(201).json(port);
});

app.put("/update/:id", async (req, res) => {
  const {id} = req.params;

  const {name, description, linkSite, imagePath} = req.body;

  // const imagePath = req.file?.filename;
  await Portifolio.findByIdAndUpdate(id, {
    name,
    description,
    linkSite,
    imagePath
  });

  return res.sendStatus(204);
});

app.delete("/delete/:id", async (req, res) => {
  const {id} = req.params;
  await Portifolio.findByIdAndDelete(id);


  return res.sendStatus(204);
});

app.listen(port, () => console.log(`🚀 Meu site http://localhost:${port}`));

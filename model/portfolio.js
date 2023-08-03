const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pessoaSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  linkSite: {
    type: String,
    require: true,
  },
  imagePath: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Pessoa", pessoaSchema);

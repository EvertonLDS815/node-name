const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pessoaSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model("Pessoa", pessoaSchema);
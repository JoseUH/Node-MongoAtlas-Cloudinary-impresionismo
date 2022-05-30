const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CuadroSchema = new Schema(
  {
    titulo: { type: String, required: true },
    imagen: { type: String, required: true },
    year: { type: Number, required: false },
    autor: { type: String, required: false }
  },
  { timestamps: true }
);

const Cuadro = mongoose.model("cuadros", CuadroSchema);

module.exports = Cuadro;
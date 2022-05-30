const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PintorSchema = new Schema(
  {
    nombre: { type: String, required: true },
    foto: { type: String, required: true },
    pais: { type: String, required: false },
    cuadros: [
      { type: Schema.Types.ObjectId, ref: "cuadros", required: false },
    ],
  },
  { timestamps: true }
);

const Pintor = mongoose.model("pintores", PintorSchema);

module.exports = Pintor;

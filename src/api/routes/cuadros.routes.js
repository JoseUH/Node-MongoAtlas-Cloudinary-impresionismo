const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")

const {
  getAllCuadros,
  getCuadrosByID,
  createCuadros,
  deleteCuadros,
  patchCuadro,
} = require("../controllers/cuadros.controller");

router.get("/", getAllCuadros);
router.get("/:id", getCuadrosByID);
router.post("/", upload.single("imagen"), createCuadros);
router.delete('/:id',upload.single("imagen"), deleteCuadros);
router.patch('/:id',upload.single("imagen"), patchCuadro)

module.exports = router;

const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllCuadros,
  getCuadrosByID,
  createCuadros,
  deleteCuadros,
  patchCuadro,
} = require("../controllers/cuadros.controller");

router.get("/", getAllCuadros);
router.get("/:id", getCuadrosByID);
router.post("/",[isAuth], upload.single("imagen"), createCuadros);
router.delete('/:id',[isAuth], upload.single("imagen"), deleteCuadros);
router.patch('/:id',[isAuth], upload.single("imagen"), patchCuadro)

module.exports = router;

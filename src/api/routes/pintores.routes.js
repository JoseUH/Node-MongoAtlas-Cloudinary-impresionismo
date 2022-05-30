
const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")

const {
  getAllPintores,
  getPintoresByID,
  createPintores,
  deletePintores,
  patchPintor,
} = require("../controllers/pintores.controller");

router.get("/", getAllPintores);
router.get("/:id",  getPintoresByID);
router.post("/",upload.single("foto"), createPintores);
router.delete('/:id',upload.single("foto"), deletePintores);
router.patch('/:id',upload.single("foto"), patchPintor)

module.exports = router;


const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllPintores,
  getPintoresByID,
  createPintores,
  deletePintores,
  patchPintor,
} = require("../controllers/pintores.controller");

router.get("/", getAllPintores);
router.get("/:id",  getPintoresByID);
router.post("/",[isAuth],upload.single("foto"), createPintores);
router.delete('/:id',[isAuth],upload.single("foto"), deletePintores);
router.patch('/:id',[isAuth],upload.single("foto"), patchPintor)

module.exports = router;

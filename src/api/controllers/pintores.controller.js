const { deleteFile } = require("../../middlewares/deleteFile");
const Pintor = require("../models/pintores.model.js");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllPintores = async (req, res, next) => {
  try {
    
    const allPintores = await Pintor.find().populate("cuadros");
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      pintores: allPintores,
    });
  } catch (error) {
    return next(error);
  }
};

const getPintoresByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pintoresByID = await Pintor.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      pintor: pintoresByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createPintores = async (req, res, next) => {
  try {
    const newPintores = new Pintor(req.body);

    if (req.file) {
      newPintores.foto = req.file.path;
    }
    const createdPintores = await newPintores.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      console: createdPintores,
    });
  } catch (error) {
    return next(error);
  }
};

const deletePintores = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const pintorBorrado = await Pintor.findByIdAndDelete(id);
  
      return res.status(200).json(pintorBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchPintor = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchPintor = new Pintor(req.body);
  
      patchPintor._id = id;

      
      const pintorData= await Pintor.findById(id)

      patchPintor.cuadros =[...pintorData.cuadros, ...patchPintor.cuadros]

      if (pintorData.foto) {
        
        deleteFile(pintorData.foto);
        }

      if (req.file) {
        patchPintor.foto = req.file.path;
      }
  
      const PintorDB = await Pintor.findByIdAndUpdate(id, patchPintor);
      
      return res.status(200).json({ nuevo: patchPintor, vieja: PintorDB });
    } catch (error) {

      return next(error);
    }
  };
  
module.exports = { getAllPintores, getPintoresByID, createPintores,patchPintor,deletePintores };

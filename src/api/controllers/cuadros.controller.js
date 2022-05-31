const { deleteFile } = require("../../middlewares/deleteFile");
const Cuadro = require("../models/cuadros.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllCuadros = async (req, res, next) => {
  try {
    const allCuadros = await Cuadro.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      cuadros: allCuadros,
    });
  } catch (error) {
    return next(error);
  }
};


const getCuadrosByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cuadrosByID = await Cuadro.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Cuadro: cuadrosByID,
    });
  } catch (error) {
    return next(error);
  }
};


const createCuadros = async (req, res, next) => {
  try {
    const newCuadros = new Cuadro(req.body);
    if (req.file) {
      newCuadros.imagen = req.file.path;
    }
    const createdCuadros = await newCuadros.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      cuadro: createdCuadros,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteCuadros = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const cuadroBorrado = await Cuadro.findByIdAndDelete(id);
  
      return res.status(200).json(cuadroBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchCuadro = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchCuadro = new Cuadro(req.body);
  
      patchCuadro._id = id;

      const cuadroData= await Cuadro.findById(id)

      patchCuadro.autor =[...cuadroData.autor, ...patchCuadro.autor]

      if (cuadroData.imagen) {
        deleteFile(cuadroData.imagen);
        }

      if (req.file) {
        patchCuadro.imagen = req.file.path;
      }
  
      const CuadroDB = await Cuadro.findByIdAndUpdate(id, patchCuadro);
      
      return res.status(200).json({ nuevo: patchCuadro, vieja: CuadroDB });
    } catch (error) {
      return next(error);
    }
  };

module.exports = { getAllCuadros, getCuadrosByID, createCuadros,patchCuadro,deleteCuadros};

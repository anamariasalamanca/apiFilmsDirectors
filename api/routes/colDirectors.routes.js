const express = require("express");
const { upload, uploadToCloudinary } = require("../middlewares/file.middlewares");
const ColDirector = require("../models/colDirectors.model");
const router = express.Router();

//const {isAuth} = require("../../middlewares/auth.middleware")

router.get("/", async (req, res, next) => {
  try {
    const colDirectors = await ColDirector.find();
    return res.status(200).json(colDirectors);
  } catch (error) {
    return next(error);
  }
});

router.post("/createColDirector", [upload.single('img'), uploadToCloudinary], async (req, res, next) => { /*he borrado el [isAuth] que va luego de la primer coma*/
  try {
    const newColDirector = new ColDirector({
      name: req.body.name,
      age: req.body.age,
      description: req.body.description,
      img: req.body.img = req.file_url
    });

    const createdColDirector = await newColDirector.save();
    return res.status(201).json(createdColDirector);
  } catch (error) {
    next(error);
  }
});

router.get("/searchByName/:name", async (req, res, next) => {
  const { name } = req.params;

  try {
    const colDirectorByName = await ColDirector.find({ name });
    return res.status(200).json(colDirectorByName);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await ColDirector.findByIdAndDelete(id);
    return res.status(200).json("Director/a eliminado!")
    
  } catch (error) {
    next(error);
  }
} )

module.exports = router;
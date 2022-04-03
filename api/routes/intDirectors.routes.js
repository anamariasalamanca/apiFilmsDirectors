const express = require("express");
const { upload, uploadToCloudinary } = require("../middlewares/file.middlewares");
const IntDirector = require("../models/intDirectors.model");
const router = express.Router();

//const {isAuth} = require("../../middlewares/auth.middleware")

router.get("/", async (req, res, next) => {
  try {
    const intDirectors = await IntDirector.find();
    return res.status(200).json(intDirectors);
  } catch (error) {
    return next(error);
  }
});

router.post("/createIntDirector", [upload.single('img'), uploadToCloudinary], async (req, res, next) => {
  try {
    const newIntDirector = new IntDirector({
      name: req.body.name,
      age: req.body.age,
      description: req.body.description,
      img: req.body.img = req.file_url
    });

    const createdIntDirector = await newIntDirector.save();
    return res.status(201).json(createdIntDirector);
  } catch (error) {
    next(error);
  }
});

router.get("/searchByName/:name", async (req, res, next) => {
  const { name } = req.params;

  try {
    const intDirectorByName = await IntDirector.find({ name });
    return res.status(200).json(intDirectorByName);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
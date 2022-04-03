const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IntDirectorsSchema = new Schema(
    {
      name: { type: String, required: true },
      age: { type: Number, required: false },
      description: { type: String, required: false },
      img: { type: String, required: false}
      
    },
    { timestamps: true }
  );
  
  const intDirector = mongoose.model("intDirectors", IntDirectorsSchema);
  module.exports = intDirector;


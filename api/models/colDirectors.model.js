const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ColDirectorsSchema = new Schema(
    {
      name: { type: String, required: true },
      age: { type: Number, required: false },
      description: { type: String, required: false },
      img: { type: String, required: false}
      
    },
    { timestamps: true }
  );
  
  const colDirector = mongoose.model("colDirectors", ColDirectorsSchema);
  module.exports = colDirector;

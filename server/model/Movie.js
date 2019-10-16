const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = new Schema(
  {
    name: { type: String },
    overview: { type: String },
    rating: { type: Number },
    _director: { type: mongoose.SchemaTypes.ObjectId, ref: "Director" }
  },
  {
    timestamps: true
  }
);

// model is same as connection in database
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

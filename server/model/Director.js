const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema(
  {
    name: { type: String },
    age: { type: Number },
    _movies: { type: Schema.Types.ObjectId, ref: "Movie" }
  },
  {
    timestamps: true
  }
);

const Director = mongoose.model("Director", directorSchema);

module.exports = Director;

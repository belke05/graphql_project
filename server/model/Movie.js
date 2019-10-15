const mongoose = require("mongoose")
const Schema = mongoose.Schema


let movieSchema = new Schema({
    name: {type: String},
    genre: {type:String},
    rating: {type:Number}
}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
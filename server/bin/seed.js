require("../config/database");
const Movie = require("../model/Movie");
const Director = require("../model/Director");
const mongoose = require("mongoose");

const movies = [
  { name: "blade", genre: "action", rating: 8 },
  { name: "once upon a time in hollywood", genre: "drama", rating: 9 },
  { name: "el camino", genre: "drama", rating: 7 }
];
const directors = [
  { name: "russo", _movies: "1", age: 44, id: "4" },
  { name: "tarrantino", _movies: "2", age: 59, id: "5" },
  { name: "unknown", _movies: "3", age: 73, id: "6" }
];

deleteAllthenInsert(movies).then(res => {
  console.log(res);
  mongoose.disconnect();
});

async function deleteAllthenInsert(movies) {
  await Movie.deleteMany();
  await Movie.insertMany(movies);
  await Director.deleteMany();
  await Director.insertMany(directors);
  return "succes deleting and inserting";
}

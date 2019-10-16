require("../config/database");
const Movie = require("../model/Movie");
const Director = require("../model/Director");
const mongoose = require("mongoose");
const axios = require("axios");

let movies = [];
let directors;
axios
  .get(
    "https://api.themoviedb.org/3/movie/popular?page=1&api_key=1646d752a6cb1bd74df305533b85c70f"
  )
  .then(res => {
    console.log(res.data.results);
    const allMovies = res.data.results.slice(0, 6);
    allMovies.forEach(movie => {
      movies.push(
        new Movie({
          name: movie.title,
          overview: movie.overview,
          rating: movie.vote_average
        })
      );
    });
    directors = [
      new Director({
        name: "director 1",
        age: 44,
        _movies: [movies[0]._id, movies[1]._id]
      }),
      new Director({
        name: "director 2",
        age: 59,
        _movies: [movies[2]._id, movies[3]._id]
      }),
      new Director({
        name: "director 3",
        age: 79,
        _movies: [movies[4]._id, movies[5]._id]
      })
    ];
    movies[0]._director = directors[0]._id;
    movies[1]._director = directors[0]._id;
    movies[2]._director = directors[1]._id;
    movies[3]._director = directors[1]._id;
    movies[4]._director = directors[2]._id;
    movies[5]._director = directors[2]._id;
    deleteAllthenInsert().then(res => {
      console.log(res);
      mongoose.disconnect();
    });
  })
  .catch(err => {
    console.log("error calling upon movies");
  });

async function deleteAllthenInsert() {
  await Movie.deleteMany();
  await Movie.insertMany(movies);
  await Director.deleteMany();
  await Director.insertMany(directors);
  return "succes deleting and inserting";
}

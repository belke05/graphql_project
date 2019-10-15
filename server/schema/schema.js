// when working with mongoose we define a schema and based on the
// schema we make a subclass of mongoose.Model with the function .model()
// a model can be used to create new documents or to query existing documents
const Movie = require("../model/Movie");
const Director = require("../model/Director");
const movies = [
  { name: "blade", genre: "action", rating: 8, id: "1" },
  { name: "once upon a time in hollywood", genre: "drama", rating: 9, id: "2" },
  { name: "el camino", genre: "drama", rating: 7, id: "3" }
];
const directors = [
  { name: "russo", _movies: "1", age: 44, id: "4" },
  { name: "tarrantino", _movies: "2", age: 59, id: "5" },
  { name: "unknown", _movies: "3", age: 73, id: "6" }
];

// lodash for nice new array functions
const _ = require("lodash");

// in GQL we have to define types
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  // function takes object defines what this object is about
  // this is helping overcoming ref errors
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    rating: { type: GraphQLInt }
  })
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
    // _movies: { type: GraphQLString }
  })
});

// root queries to jump from front into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // this is name used when querying in the front
    // our query in the front will be called movie
    movie: {
      // when making query for this movie you have to give as argument
      // the id of the particular movie
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Movie.findById(args.id);
        // here we write the code from db/other source
        // when we get id we fire this function
        const foundMovie = movies.find(movie => {
          return movie.id === args.id;
        });
        const foundMovieSame = _.find(movies, { id: args.id });
        console.log(foundMovieSame);

        return foundMovieSame;
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const foundDirector = directors.find(
          director => director.id === args.id
        );
        return foundDirector;
      }
    }
  }
});

// movie(id:"123"){
//     genre
//     name
// }
// will look inside of rootquerq fields for movie
// when movie is found it args because it expected an id
// to come allong with the query it will then attach it to
// the resolve function

// from front end they are allowed to use rootquery
module.exports = new GraphQLSchema({
  query: RootQuery
});

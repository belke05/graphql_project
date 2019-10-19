//NOTE mongoose explainer for graphql
require("../config/database");
const Movie = require("../model/Movie");
const Director = require("../model/Director");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("connection in schema file confirmed");
});

// in GQL we have to define types
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList // used for relationships
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  //NOTE why we pass a function to fields
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    overview: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    _director: {
      type: DirectorType,
      resolve(parent, args) {
        //NOTE nested resolve functions
        return Director.findById(parent._director);
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    _movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        //NOTE nested resolve functions
        //NOTE shows how things can be done a hard and easy way
        return Movie.find({ _director: parent.id });
      }
    }
  })
});

// root queries to jump in our graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // this is name used when querying in the front
    // our query in the front will be called movie
    movie: {
      // when making query for this movie you have to give as argument
      // the id of the particular movie
      type: MovieType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        // if (args.name) {
        //   return Movie.findOne({ name: args.name });
        // }
        console.log(args);
        return Movie.findOne({ name: args.name });
      }
    },
    director: {
      type: DirectorType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(args.name);
        return Director.findOne({ name: args.name });
      }
    },
    //NOTE getting all the values
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      }
    }
  }
});

//NOTE mutations for CRUD
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      // nonnull makes name argument a requirement
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        // creating the director with mongoose
        let director = new Director({ name: args.name, age: args.age });
        return director.save();
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        rating: { type: GraphQLFloat },
        name: { type: new GraphQLNonNull(GraphQLString) },
        overview: { type: GraphQLString },
        _director: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Movie.create({
          rating: args.rating,
          name: args.name,
          overview: args.overview,
          _director: args._director
        });
      }
    }
  }
});

// from front end they are allowed to use rootquery
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

//NOTE query example

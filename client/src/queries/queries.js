import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

//NOTE same as what we did in GQL
const getMoviesQuery = gql`
  {
    movies {
      id
      name
      overview
      rating
      _director {
        name
      }
    }
  }
`;

const getDirectorsQuery = gql`
  {
    directors {
      id
      name
      age
      _movies {
        name
      }
    }
  }
`;

//NOTE dollar sign means a query variable
// these will be passed in to the mutation from the form we made
const addMovieMutation = gql`
  mutation(
    $name: String!
    $overview: String!
    $rating: Float!
    $_director: ID!
  ) {
    addMovie(
      name: $name
      overview: $overview
      _director: $_director
      rating: $rating
    ) {
      name
      id
    }
  }
`;

// same as uptop query and dollar sign indicates that we get
// an id as argument
const getMovieQuery = gql`
  query($name: String) {
    movie(name: $name) {
      name
      rating
      overview
      id
      _director {
        name
        _movies {
          name
        }
      }
    }
  }
`;

const getDirectorQuery = gql`
  query($name: String) {
    director(name: $name) {
      name
      age
      id
      _movies {
        name
      }
    }
  }
`;

export {
  getDirectorsQuery,
  getMoviesQuery,
  addMovieMutation,
  getMovieQuery,
  getDirectorQuery
};

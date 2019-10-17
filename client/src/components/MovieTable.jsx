import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import MovieAddition from "./subcomponents/MovieAddition";
// we need this package because graphql is not js
// this package will take care of parsing it
import { gql } from "apollo-boost";
// this package is to bind apollo to react
import { graphql } from "react-apollo";
import { getMoviesQuery } from "../queries/queries";

function MovieTable(props) {
  // when we get the data back our component will rerender
  console.log(props.data, window.location.hostname);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (props.data.movies) setMovies(props.data.movies);
  }, [props.data]);

  return (
    <div className="table_wrapper">
      {props.data.loading && <Spinner animation="border" variant="secondary" />}
      {!props.data.loading && (
        <Table striped bordered hover variant="dark" style={{ padding: "5%" }}>
          <thead>
            <tr>
              <th>name</th>
              <th>overview</th>
              <th>rating</th>
              <th>director</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => {
              return (
                <tr key={movie.id}>
                  <td>{movie.name}</td>
                  <td>{movie.overview}</td>
                  <td>{movie.rating}</td>
                  <td>{movie._director.name}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <MovieAddition />
    </div>
  );
}

// take the movies query and bind it to the movietable component
export default graphql(getMoviesQuery)(MovieTable);

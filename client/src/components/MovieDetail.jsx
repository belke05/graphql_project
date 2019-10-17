import React, { useEffect, useState } from "react";
import { graphql, useLazyQuery } from "react-apollo";
import { getMovieQuery } from "../queries/queries";

function MovieDetail(props) {
  const [movie, setMovie] = useState("");
  const [movieSearch, setMovieSearch] = useState("");
  console.log(props);
  const [getMovieQuery, { loading, data }] = useLazyQuery(getMovieQuery);
  if (data && data.movie) {
    setMovie(data.movie);
  }
  return (
    <div>
      <input
        type="text"
        value={movieSearch}
        onChange={e => {
          setMovieSearch(e.target.value);
        }}
      ></input>
      <button
        onClick={e => {
          getMovieQuery({ variables: { name: movieSearch } });
        }}
      ></button>
      {movie != "" && <div>{movie.name}</div>}
    </div>
  );
}

export default graphql(
  getMovieQuery
  //   ,
  //   {
  //   // every time this state updates this query will rerun
  //   options: props => {
  //     console.log(movieSearchGlobal);
  //     return {
  //       variables: {
  //         name: movieSearchGlobal
  //       }
  //     };
  //   }
  //  }
)(MovieDetail);

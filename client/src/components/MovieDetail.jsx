import React, { useEffect, useState } from "react";
import { graphql, useLazyQuery, useQuery } from "react-apollo";
import { getMovieQuery, getMoviesQuery } from "../queries/queries";

function MovieDetail(props) {
  // const { loading, error, data } = useQuery(getMovieQuery, {
  //   variables: { name: "Joker" }
  // });
  const [searchedMovie, setSearchedMovie] = useState(null);
  const [loadMovie, { called, loading, data }] = useLazyQuery(getMovieQuery, {
    variables: { name: searchedMovie }
  });

  if (loading && called) return "Loading...";
  console.log(data);
  return (
    <div>
      <input
        type="text"
        name="movie-title"
        id="search-box"
        value={searchedMovie}
        onChange={e => {
          setSearchedMovie(e.target.value);
        }}
      />
      <button
        onClick={e => {
          loadMovie();
        }}
      ></button>
      {called && !loading && (
        <div>
          {data.movie.name}
          {data.movie.rating}
        </div>
      )}
    </div>
  );
}

export default MovieDetail;

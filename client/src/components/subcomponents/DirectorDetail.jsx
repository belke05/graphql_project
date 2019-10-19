import React, { useEffect, useState } from "react";
import { graphql } from "react-apollo";
import { getDirectorQuery } from "../../queries/queries";

function DirectorDetail(props) {
  let director = props.data.director;
  return (
    <div>
      {<span>no director found</span> && director && (
        <ul>
          <li>{director.name}</li>
          <li>{director.age}</li>
        </ul>
      )}
      <h2>made following movies</h2>
      {director &&
        director._movies.map(movie => {
          return <li>{movie.name}</li>;
        })}
    </div>
  );
}

export default graphql(getDirectorQuery, {
  options: props => {
    return {
      variables: {
        name: props.directorname
      }
    };
  }
})(DirectorDetail);

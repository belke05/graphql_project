import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { getDirectorsQuery } from "../queries/queries";

function DirectorTable(props) {
  const [directors, setDirectors] = useState([]);
  useEffect(() => {
    if (props.data.directors) setDirectors(props.data.directors);
  }, [props.data]);
  return (
    <div className="table_wrapper">
      {props.data.loading && <Spinner animation="border" variant="secondary" />}
      {!props.data.loading && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>movies</th>
            </tr>
          </thead>
          <tbody>
            {directors.map(director => {
              return (
                <tr key={director.id}>
                  <td>{director.name}</td>
                  <td>{director.age}</td>
                  <td>
                    {director._movies.map(movie => {
                      return <span>{movie.name} / </span>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default graphql(getDirectorsQuery)(DirectorTable);

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Col } from "react-bootstrap";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { flowRight as compose } from "lodash";
//NOTE compose to be able to bind 2 queries
import { getDirectorsQuery, addMovieMutation, getMoviesQuery } from "../../queries/queries";

function MovieAddition(props) {
  console.log("props", props);
  const [directors, setDirectors] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    rating: 0,
    overview: "",
    _director: ""
  });
  useEffect(() => {
    if (props.getDirectorsQuery.directors) {
      setDirectors(props.getDirectorsQuery.directors);
    }
  }, [props.getDirectorsQuery.directors]);

  function handleFormChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  }
  function handleSubmit(e) {
    console.log("submission started");
    e.preventDefault();
    props.addMovieMutation({
      variables: {
        name: formValues.name,
        rating: parseFloat(formValues.rating),
        overview: formValues.overview,
        _director: formValues._director
      },
      // after this mutation has fired we want to redo this query
      // this will dynamicly add a new movie to our table 
      refetchQueries: [{query: getMoviesQuery}]
    });
  }

  return (
    <div style={{ margin: "5%" }}>
      {directors.length < 1 && <Spinner />}
      {directors.length > 1 && (
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>&#x1F3A5; name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter new movie"
                name="name"
                value={formValues.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridOverview">
              <Form.Label>&#x1F3A5; overview</Form.Label>
              <Form.Control
                max={10}
                type="text"
                name="overview"
                placeholder="enter an overview"
                value={formValues.overview}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridRating">
              <Form.Label>&#x1F3A5; rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter a rating"
                name="rating"
                value={formValues.rating}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridDirector">
              <Form.Label>director</Form.Label>
              <Form.Control
                as="select"
                name="_director"
                onChange={handleFormChange}
              >
                {directors.map(director => {
                  return (
                    <option key={director.id} value={director.id}>
                      {director.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Button variant="success" onClick={handleSubmit}>
            <i class="fas fa-plus-square"></i>
          </Button>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </Form>
      )}
    </div>
  );
}

export default compose(
  graphql(getDirectorsQuery, { name: "getDirectorsQuery" }),
  graphql(addMovieMutation, { name: "addMovieMutation" })
)(MovieAddition);

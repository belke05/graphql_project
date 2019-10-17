// using path and dotenv path to make sure we specficy the right path os independent
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("./config/database");
const express = require("express");
// parses incoming req.bodies
// because those are coming from user and should
// not be trusted
const bodyParser = require("body-parser");
//NOTE cors usecase
const cors = require("cors");
// used for the logger
const logger = require("morgan");
// allows express to understand graphql
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, process.env.NODE_ENV !== "production");
    },
    optionsSuccessStatus: 200,
    credentials: true
  })
);

// error codes will have different colors
app.use(logger("dev"));
// new body object containing the
// parsed data is populated on the request object after the middleware
app.use(bodyParser.json());

// Set the public folder to "~/client/build/"
// Example: http://localhost:5000/favicon.ico => Display "~/client/build/favicon.ico"
app.use(express.static(path.join(__dirname, "../client/build")));

// middleware for graphql
// when a / graphql request comes in graphqlHTTP will
// handle it ==> for this grpahql needs schemas (props of datatypes and relations between)
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true //the postman of graphql
  })
);

// For any other routes, redirect to the index.html file of React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// we will use this in the config folder
module.exports = app;

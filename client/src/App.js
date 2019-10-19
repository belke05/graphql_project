import React from "react";
import { Route, Switch } from "react-router-dom";
// components
import MainNav from "./components/subcomponents/MainNav";
import MovieTable from "./components/MovieTable";
import DirectorTable from "./components/DirectorTable";
import MovieDetail from "./components/MovieDetail";
import DirectorSearchWrapper from "./components/DirectorSearchWrapper";
import Home from "./components/Home";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
//NOTE apollo provider explained

console.log(window.location.hostname);
const client = new ApolloClient({
  uri: `http://localhost:7000/graphql` //endpoint we make requests or queries to
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <MainNav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/moviestable" exact component={MovieTable} />
          <Route path="/directorstable" exact component={DirectorTable} />
          <Route path="/director" component={DirectorSearchWrapper} />
          <Route path="/movie" exact component={MovieDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;

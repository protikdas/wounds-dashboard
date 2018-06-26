import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./less/global.less";

/* <----- COMPONENTS ------> */
import Dashboard from "./components/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;

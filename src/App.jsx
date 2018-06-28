import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./less/global.less";

/* <----- COMPONENTS ------> */
import Authentication from "./components/Authentication/Authentication";
import Dashboard from "./components/Dashboard/Dashboard";
import MobileView from "./components/MobileView/MobileView";

import Particles from "react-particles-js";
import particlesParams from "./less/particles";

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      viewWidth: window.innerWidth
    };
  }

  updateDimensions = () => {
    this.setState({
      viewWidth: window.innerWidth
    });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { viewWidth } = this.state,
      { authenticated } = this.props;
    if (viewWidth >= 1024) {
      return (
        <div className="App">
          <div className="app-background">
            <Particles params={particlesParams} />
          </div>
          <Switch>
            <Route
              exact
              path="/"
              component={() =>
                authenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect to="/auth" />
                )
              }
            />
            <Route
              path="/auth"
              component={() =>
                authenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Authentication />
                )
              }
            />
            <Route
              path="/dashboard"
              component={() =>
                authenticated ? <Dashboard /> : <Redirect to="/auth" />
              }
            />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      );
    } else {
      return <MobileView />;
    }
  }
}

export default connect(
  mapStateToProps,
  null
)(App);

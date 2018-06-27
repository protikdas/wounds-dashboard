import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./less/global.less";

/* <----- COMPONENTS ------> */
import Dashboard from "./components/Dashboard/Dashboard";
import MobileView from "./components/MobileView/MobileView";

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
    const { viewWidth } = this.state;
    if (viewWidth >= 1024) {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={() => <Redirect to="/dashboard" />} />
          </Switch>
        </div>
      );
    } else {
      return <MobileView />;
    }
  }
}

export default App;

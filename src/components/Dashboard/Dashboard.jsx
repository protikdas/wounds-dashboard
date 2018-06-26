import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./Dashboard.less";

/* <----- COMPONENTS ------> */
import Sidebar from "../Sidebar/Sidebar";
import PatientList from "../PatientList/PatientList";
import PatientDetails from "../PatientDetails/PatientDetails";

/* <----- ACTIONS ------> */
import { getPatients } from "../../actions/patient";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getPatients();
  }

  render() {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="view-container">
          <Switch>
            <Route path="/dashboard/patients" component={PatientList} />
            <Route
              path="/dashboard/patient/:id"
              component={props => <PatientDetails match={props.match} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getPatients: PropTypes.func.isRequired
};

export default connect(
  () => ({}),
  { getPatients }
)(Dashboard);

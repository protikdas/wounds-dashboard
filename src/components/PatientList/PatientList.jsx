import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import "./PatientList.less";
import { Link } from "react-router-dom";

/* <----- HIGHER ORDER COMPONENT ------> */
import View from "../../HOC/View/View";

const mapStateToProps = state => ({
  patients: state.patient.patients
});

const PatientList = ({ ...props }) => {
  return (
    <div className="patient-list-wrapper">
      <div className="patient-list-header-container">
        <h1>Patient List</h1>
      </div>
      <div className="patient-list-container">
        {props.patients.map((patient, index) => {
          return (
            <div className="patient-container" key={index}>
              <Link to={`/dashboard/patient/${[patient.id]}`}>
                {JSON.stringify(patient.attributes)}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="patient-list-bottom-overlay" />
    </div>
  );
};

PatientList.propTypes = {
  patients: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  null
)(View("patients")(PatientList));

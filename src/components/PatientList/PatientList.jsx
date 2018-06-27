import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./PatientList.less";
import { Link } from "react-router-dom";

/* <----- HIGHER ORDER COMPONENTS ------> */
import View from "../../HOC/View/View";

/* <----- COMPONENTS ------> */
import PatientInfo from "../PatientInfo/PatientInfo";

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
          if ((patient || {}).attributes) {
            return (
              <div className="patient-container" key={index}>
                <PatientInfo patient={patient} />
                <Link to={`/dashboard/patient/${[patient.id]}`}>
                  <div className="patient-wounds-link">
                    <div className="wounds-list" />
                    <h3 className="not-bold">Wounds</h3>
                  </div>
                </Link>
              </div>
            );
          } else {
            return (
              <div className="patient-container" key={index}>
                <div className="loading" />
              </div>
            );
          }
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

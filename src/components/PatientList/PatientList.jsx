import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import "./PatientList.less";
import { Link } from "react-router-dom";

/* <----- ASSETS ------> */
import bed from "../../assets/bed.svg";
import room from "../../assets/room.svg";

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
          if ((patient || {}).attributes) {
            const { attributes } = patient,
              {
                avatarUrl,
                firstName,
                lastName,
                dateOfBirth,
                roomNumber,
                bedNumber
              } = attributes;
            const age = moment().diff(dateOfBirth, "years");
            return (
              <div className="patient-container" key={index}>
                <div className="patient-identity">
                  <Link to={`/dashboard/patient/${[patient.id]}`}>
                    <img
                      className="patient-avatar"
                      src={avatarUrl}
                      alt="patient"
                    />
                  </Link>
                  <div className="patient-vitals">
                    <span className="patient-name-age">
                      <h3>{`${firstName} ${lastName},`}</h3>&nbsp;
                      <h3 className="not-bold">{age}</h3>
                    </span>
                    <div className="patient-location">
                      <div className="patient-location-info">
                        <img className="room" src={room} alt="Room" />&nbsp;
                        <h3 className="not-bold">{roomNumber}</h3>
                      </div>
                      <div className="patient-location-info">
                        <img className="bed" src={bed} alt="Bed" />&nbsp;
                        <h3 className="not-bold">{bedNumber}</h3>
                      </div>
                    </div>
                  </div>
                </div>
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

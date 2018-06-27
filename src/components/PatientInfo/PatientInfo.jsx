import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import "./PatientInfo.less";

/* <----- ASSETS ------> */
import bed from "../../assets/bed.svg";
import room from "../../assets/room.svg";

const PatientInfo = ({ ...props }) => {
  const { patient } = props;
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
    <div className="patient-identity">
      <Link to={`/dashboard/patient/${[patient.id]}`}>
        <img className="patient-avatar" src={avatarUrl} alt="patient" />
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
  );
};

PatientInfo.propTypes = {};

export default PatientInfo;

import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./PatientDetails.less";

/* <----- ASSETS ------> */
import check from "../../assets/check.svg";
import cross from "../../assets/cross.svg";

/* <----- HIGHER ORDER COMPONENT ------> */
import View from "../../HOC/View/View";

/* <----- ACTIONS ------> */
import { getWounds } from "../../actions/patient";
import { selectWound } from "../../actions/wound";

const mapStateToProps = (state, props) => {
  const patients = state.patient.patients,
    patientID = props.match.params.id,
    patientIndex = patients.findIndex(p => p.id === parseInt(patientID, 10)),
    patient = patients[patientIndex],
    selectedWound = state.wound.selectedWound;
  return {
    patient: patient,
    wounds: state.patient.wounds,
    selectedWound
  };
};

class PatientDetails extends Component {
  componentWillMount() {
    const { match } = this.props;
    const patientID = match.params.id;
    this.props.getWounds(patientID);
  }

  render() {
    const { patient, wounds, selectedWound, selectWound } = this.props;
    let woundImageUrl = "";
    if (selectedWound && wounds) {
      let woundIndex = wounds.findIndex(w => w.id === selectedWound);
      if (woundIndex !== -1) {
        woundImageUrl = wounds[woundIndex].attributes.imageUrl;
      }
    }
    return (
      <PatientContainer patient={patient}>
        <Details />
        <WoundsContainer>
          <WoundList>
            {wounds &&
              wounds.map((wound, index) => {
                return (
                  <Wound
                    key={index}
                    wound={wound}
                    selectedWound={selectedWound}
                    selectWound={selectWound}
                  />
                );
              })}
          </WoundList>
          <WoundImage imageUrl={woundImageUrl} />
        </WoundsContainer>
      </PatientContainer>
    );
  }
}

PatientDetails.propTypes = {};

export default connect(
  mapStateToProps,
  { getWounds, selectWound }
)(View("patient")(PatientDetails));

const PatientContainer = ({ ...props }) => {
  const { className, children, ...rest } = props;
  return (
    <div className={className || "patient-details-container"}>{children}</div>
  );
};

const Details = ({ ...props }) => {
  const { className, children } = props;
  return (
    <div className={className || "details-container"}>
      <h1>Details</h1>
    </div>
  );
};

const WoundsContainer = ({ ...props }) => {
  const { className, children, ...rest } = props;
  return <div className={className || "wounds-container"}>{children}</div>;
};

const WoundList = ({ ...props }) => {
  const { className, children, ...rest } = props;
  return <div className={className || "wounds-list-container"}>{children}</div>;
};

const Wound = ({ ...props }) => {
  const {
    className,
    children,
    wound,
    selectedWound,
    selectWound,
    ...rest
  } = props;
  if (wound) {
    const { attributes, id } = wound;
    const {
      type,
      bodyLocation,
      inHouseAcquired,
      resolved,
      imageUrl
    } = attributes;
    return (
      <div className={className || "wound-container"}>
        <div className="wound-image-container">
          <img className="wound-image" src={imageUrl} alt="wound" />
          <div
            className={`magnify ${selectedWound === id ? "selected" : ""}`}
            onClick={() => {
              selectWound(id);
            }}
          />
        </div>
        <div className="wound-details-container">
          <div className="wound-details">
            <strong>{type}</strong>
            <br />
            <p>{bodyLocation}</p>
          </div>
          <div className="wound-controls">
            <span className="wound-control">
              <p>Acquired In House</p>
              &nbsp;
              <div className="wound-toggle disabled">
                <img
                  className="toggle-symbol"
                  src={inHouseAcquired ? check : cross}
                  alt={inHouseAcquired ? "T" : "F"}
                />
              </div>
            </span>
            <span className="wound-control">
              <p>Resolved</p>
              &nbsp;
              <div className={`wound-toggle ${resolved ? "green" : "red"}`}>
                <img
                  className="toggle-symbol"
                  src={resolved ? check : cross}
                  alt={resolved ? "T" : "F"}
                />
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="loading">Loading</div>;
  }
};

const WoundImage = ({ ...props }) => {
  const { className, children, imageUrl, ...rest } = props;
  if (imageUrl) {
    return (
      <div className={className || "wound-magnified-image-container"}>
        <div
          className="wound-magnified-image-background"
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
        />
        <img className="wound-magnified-image" src={imageUrl} alt="wound" />
      </div>
    );
  } else {
    return (
      <div className={className || "wound-magnified-image-container"}>
        <h3>Please Select</h3>
      </div>
    );
  }
};

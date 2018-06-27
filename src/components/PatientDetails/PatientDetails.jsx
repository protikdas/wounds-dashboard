import React, { Component } from "react";
import moment from "moment";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./PatientDetails.less";

/* <----- ASSETS ------> */
import check from "../../assets/check.svg";
import cross from "../../assets/cross.svg";
import magnify from "../../assets/magnify.svg";

/* <----- HIGHER ORDER COMPONENTS ------> */
import View from "../../HOC/View/View";

/* <----- COMPONENTS ------> */
import PatientInfo from "../PatientInfo/PatientInfo";

/* <----- ACTIONS ------> */
import { getWounds } from "../../actions/patient";
import { selectWound, patchWound } from "../../actions/wound";

const mapStateToProps = (state, props) => {
  if (((state || {}).patient || {}).patients) {
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
  }
};

class PatientDetails extends Component {
  constructor() {
    super();

    this.state = {
      filter: "all"
    };
  }

  componentWillMount() {
    const { match } = this.props;
    const patientID = match.params.id;
    this.props.getWounds(patientID);
  }

  changeFilter = option => {
    this.setState({
      filter: option
    });
  };

  filterWounds = wounds => {
    const { filter } = this.state;
    if (wounds) {
      switch (filter) {
        case "all":
          return wounds.slice();
        case "resolved":
          return wounds.filter(wound => wound.attributes.resolved);
          break;
        case "unresolved":
          return wounds.filter(wound => !wound.attributes.resolved);
          break;
        default:
          return wounds.slice();
      }
    }
  };

  render() {
    const {
      patient,
      wounds,
      selectedWound,
      selectWound,
      patchWound
    } = this.props;

    let viewWounds = this.filterWounds(wounds);

    return (
      <PatientContainer>
        <Details patient={patient} />
        <WoundsContainer>
          <WoundsFilter
            filter={this.state.filter}
            changeFilter={this.changeFilter}
          />
          <WoundList>
            {wounds &&
              viewWounds.map((wound, index) => {
                return (
                  <Wound
                    key={index}
                    wound={wound}
                    selectedWound={selectedWound}
                    selectWound={selectWound}
                    patchWound={patchWound}
                  />
                );
              })}
          </WoundList>
          <WoundImage wounds={wounds} selectedWound={selectedWound} />
        </WoundsContainer>
      </PatientContainer>
    );
  }
}

PatientDetails.propTypes = {};

export default connect(
  mapStateToProps,
  { getWounds, selectWound, patchWound }
)(View("patient")(PatientDetails));

/* <----- FUNCTIONAL COMPONENTS ------> */

const PatientContainer = ({ ...props }) => {
  const { className, children, ...rest } = props;
  return (
    <div className={className || "patient-details-container"}>{children}</div>
  );
};

const Details = ({ ...props }) => {
  const { className, patient, children } = props;
  if ((patient || {}).attributes) {
    const { attributes } = patient,
      { dateOfBirth, address, updatedAt } = attributes;

    return (
      <div className={className || "details-container"}>
        <PatientInfo patient={patient} />
        <div className="additional-info-container">
          <div className="additional-info">
            <strong>Date of Birth</strong>
            <p>{moment(dateOfBirth).format("MMMM Do YYYY")}</p>
          </div>
          <div className="additional-info">
            <strong>Address</strong>
            <p>{address}</p>
          </div>
        </div>
        <LastUpdated
          updatedAt={moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
        />
      </div>
    );
  } else {
    return (
      <div className={className || "details-container"}>
        <div className="loading" />
      </div>
    );
  }
};

const WoundsContainer = ({ ...props }) => {
  const { className, children, ...rest } = props;
  return <div className={className || "wounds-container"}>{children}</div>;
};

const WoundList = ({ ...props }) => {
  const { className, children, ...rest } = props;
  return <div className={className || "wounds-list-container"}>{children}</div>;
};

const WoundsFilter = ({ ...props }) => {
  const { className, children, filter, changeFilter, ...rest } = props;
  return (
    <div className={className || "wounds-filter-container"}>
      <div
        className={`filter ${filter === "all" ? "filter-selected" : {}}`}
        onClick={() => changeFilter("all")}
      >
        All Wounds
        <div
          className="sky-blue-underline"
          style={filter === "all" ? { width: "60px", opacity: 1 } : {}}
        />
      </div>
      <div
        className={`filter ${filter === "resolved" ? "filter-selected" : {}}`}
        onClick={() => changeFilter("resolved")}
      >
        Resolved
        <div
          className="sky-blue-underline"
          style={filter === "resolved" ? { width: "60px", opacity: 1 } : {}}
        />
      </div>
      <div
        className={`filter ${filter === "unresolved" ? "filter-selected" : {}}`}
        onClick={() => changeFilter("unresolved")}
      >
        Unresolved
        <div
          className="sky-blue-underline"
          style={filter === "unresolved" ? { width: "60px", opacity: 1 } : {}}
        />
      </div>
    </div>
  );
};

const Wound = ({ ...props }) => {
  const {
    className,
    children,
    wound,
    selectedWound,
    selectWound,
    patchWound,
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
              <div
                className={`wound-toggle ${resolved ? "green" : "red"}`}
                onClick={() => {
                  patchWound("resolve", wound);
                }}
              >
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
  const { className, children, wounds, selectedWound, ...rest } = props;

  let imageUrl = "",
    createdAt = "",
    updatedAt = "";
  if (selectedWound && wounds) {
    let woundIndex = wounds.findIndex(w => w.id === selectedWound);
    if (woundIndex !== -1) {
      imageUrl = wounds[woundIndex].attributes.imageUrl;
      createdAt = wounds[woundIndex].attributes.createdAt;
      updatedAt = wounds[woundIndex].attributes.updatedAt;
    }
  }

  if (imageUrl) {
    return (
      <div className={className || "wound-magnified-image-container"}>
        <div
          className="wound-magnified-image-background"
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
        />
        <img className="wound-magnified-image" src={imageUrl} alt="wound" />
        <div className="wound-meta-data-container">
          <div className="wound-meta-data">
            <p>Recorded:</p>
            <p>{moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
          <div className="wound-meta-data">
            <p>Updated:</p>
            <p>{moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={className || "wound-image-help"}>
        <h3 className="not-bold">Please click on a</h3>
        <img className="magnify help" src={magnify} alt="magnify" />
        <h3 className="not-bold">icon to view</h3>
        <h3 className="not-bold">wound image.</h3>
      </div>
    );
  }
};

const LastUpdated = ({ ...props }) => {
  const { className, updatedAt, ...rest } = props;
  return (
    <div className="last-updated">
      <p>
        Last Updated:&nbsp;
        {updatedAt}
      </p>
    </div>
  );
};

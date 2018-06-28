import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Sidebar.less";
import { Link } from "react-router-dom";

import ProfilePicturePlaceHolder from "../../assets/sidebar-avatar.svg";

const mapStateToProps = state => ({
  location: state.router.location.pathname,
  fullName: state.auth.fullName,
  profession: state.auth.profession
});

const Sidebar = ({ ...props }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-profile-container">
        <div className="sidebar-circle" />
        <div className="sidebar-profile">
          <img
            className="profile-picture"
            src={ProfilePicturePlaceHolder}
            alt="avatar"
          />
          <p className="profile-name">{props.fullName}</p>
          <p className="profile-position">{props.profession}</p>
        </div>
      </div>
      <div className="sidebar-tab">
        <Link
          className="sidebar-link no-text-decoration"
          to="/dashboard/patients"
        >
          Patient List
          <div
            className="sky-blue-underline"
            style={
              props.location === "/dashboard/patients"
                ? { width: "60px", opacity: 1 }
                : {}
            }
          />
        </Link>
      </div>
      <div className="brand-container">
        <h3>Wounds</h3>
        <h3>Medical</h3>
        <h3>Dashboard</h3>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  location: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(Sidebar);

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Authentication.less";

/* <----- ACTIONS ------> */
import { updateAuthField, login } from "../../actions/auth";

const mapStateToProps = state => ({
  fullName: state.auth.fullName,
  profession: state.auth.profession,
  password: state.auth.password,
  wrongAttempt: state.auth.wrongAttempt
});

const Authentication = ({ ...props }) => {
  return (
    <div className="auth-wrapper" id="particles">
      <div className="navbar">
        <h2>Wounds Medical Dashboard</h2>
      </div>
      <div className="auth-container">
        <form
          className="auth-form"
          onSubmit={e => {
            e.preventDefault();
            props.login();
          }}
        >
          <h3>Log In</h3>
          <div className="auth-section">
            <label className="auth-label">Name</label>
            <input
              name="fullName"
              className="auth-input"
              placeholder={props.fullName}
              onChange={e => props.updateAuthField(e)}
            />
          </div>
          <div className="auth-section">
            <label className="auth-label">Profession</label>
            <input
              name="profession"
              className="auth-input"
              placeholder="Medical Practitioner"
              onChange={e => props.updateAuthField(e)}
            />
          </div>
          <div className="auth-section">
            <label className="auth-label">Password (Required)</label>
            <input
              name="password"
              className="auth-input"
              placeholder="Password"
              type="password"
              onChange={e => props.updateAuthField(e)}
            />
          </div>
          {props.wrongAttempt && (
            <p className="auth-error">Please enter the password provided.</p>
          )}
          <button className="auth-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  fullName: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  wrongAttempt: PropTypes.bool.isRequired,
  updateAuthField: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { updateAuthField, login }
)(Authentication);

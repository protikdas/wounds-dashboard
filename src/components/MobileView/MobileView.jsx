import React from "react";
import PropTypes from "prop-types";
import "./MobileView.less";

const MobileView = () => {
  return (
    <div className="mobile-view-container">
      <div className="mobile-view-navbar">
        <h2>Wounds Medical Dashboard</h2>
      </div>
      <div className="mobile-message">
        <h3 className="not-bold">
          Sorry, Wounds Medical Dashboard is currently unavailable for mobile
          devices. Please visit later or use a larger screen.
        </h3>
      </div>
    </div>
  );
};

export default MobileView;

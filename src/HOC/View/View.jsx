import React, { Component } from "react";
import "./View.less";

const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty("length") && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0);

const View = viewProp => ViewComponent => {
  return class ViewHOC extends Component {
    render() {
      return (
        <div className="view-component-container">
          {isEmpty(this.props[viewProp]) ? (
            <div className="loading">
              <h3>Loading</h3>
            </div>
          ) : (
            <ViewComponent {...this.props} />
          )}
        </div>
      );
    }
  };
};

export default View;

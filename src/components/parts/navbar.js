import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";



export default class NavBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-items">
          <div className="nav-link-wrapper">
            <NavLink exact to="/recordLogs" activeClassName="nav-link-active">
              
            </NavLink>
          </div>

          <div className="nav-link-wrapper">
            <NavLink exact to="/researchdocs" activeClassName="nav-link-active">
              Research Documents
            </NavLink>

          </div>

          <div className="nav-link-wrapper">
            <NavLink exact to="/researchlogs" activeClassName="nav-link-active">
              Research Logs
            </NavLink>

          </div>

          <div className="nav-link-wrapper">
            <NavLink exact to="/scpclearancelevels" activeClassName="nav-link-active">
              SCP Clearance Levels
            </NavLink>
          </div>

          <div className="nav-link-wrapper">
            <NavLink exact to="/RAInfo" activeClassName="nav-link-active">
              Research Administration
            </NavLink>
          </div>
          {/* <div className="nav-link-wrapper">
            <NavLink exact to="/RAInfo" activeClassName="nav-link-active">
              Research Administration
            </NavLink>
          </div> */}

        </div>
      </div>
    );
  }
}
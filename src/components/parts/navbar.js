import React from "react";
import axios from "axios";

import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationComponent = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    props.history.push('/')
    props.handleSuccessfulLogout()
  };

    return (
      <div className="nav-wrapper">
        <div className="nav-items">
          <div className="nav-link-wrapper">
            <NavLink exact to="/home" activeClassName="nav-link-active">
              Dashboard
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink exact to="/recordLogs" activeClassName="nav-link-active">
              Record Research Log
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
          <div className="nav-link-wrapper">
            {props.loggedInStatus === true? (
                dynamicLink("/userControl","Admin Control")
            ):null}
          </div>
          <div className="nav-link-wrapper">
            {props.loggedInStatus === true ? (
              <button type="text" onClick={handleSignOut}>[ Sign Out ]</button>
            ) : null}
            
          </div>
          <div className="nav-link-wrapper">
          {props.loggedInStatus === false? (
                dynamicLink("/RaLogin","[ RA Login ]")
            ):null}
            
          </div>

        </div>
      </div>
    );
  }

  export default withRouter(NavigationComponent);
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter,Link } from "react-router-dom";


import Home from './pages/home.js';
import Landing from './pages/lading.js';
import RecordLogs from './pages/recordLogs.js';
import ResearchDocs from './pages/researchDocs.js';
import ResearchLogs from './pages/researchLogs.js';
import SCPClearanceLevels from './pages/scpClearanceLevels.js';
import RaInfo from './pages/rainfo.js';
import RaLogin from './adminPages/raAdminLogin.js';
import RaAdminWindow from './adminPages/raAdminWindow.js';

import NavBar from './parts/navbar.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: false,
      username: ""
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    
  }

  handleSuccessfulLogin(response) {
   
    this.setState({
      loggedInStatus: true,
      username:response.username
    });

  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: false,
      username:''
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: false,
      username:''
    });
  }

  authdAdminPages(){
    return [
      <Route
        key="usercontrol"
        path="/usercontrol"
        render={props =>(
          <RaAdminWindow 
            {...props}
            loggedInStatus={this.state.loggedInStatus}
            username={this.state.username}
            handleSuccessfulLogout={this.handleSuccessfulLogout}
          />
          )}
      />,
      
    ];
  }

  render() {
    return (
      <div className='app'>
        {/* <NavBar
            loggedInStatus={this.state.loggedInStatus}
            username={this.state.username}
            handleSuccessfulLogout={this.handleSuccessfulLogout}
          /> */}
        <BrowserRouter>
          <Route exact path="/" component={Landing}/>
          <Route path="/home" render={props=>(
            <Home
              {...props}
              loggedInStatus={this.state.loggedInStatus}
              username={this.state.username}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
          )}/>
          <Route path="/recordLogs" render={props=>(
            <RecordLogs
              {...props}
              loggedInStatus={this.state.loggedInStatus}
              username={this.state.username}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
          )}/>
          <Route path="/researchdocs" render={props=>(
            <ResearchDocs
              {...props}
              loggedInStatus={this.state.loggedInStatus}
              username={this.state.username}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
          )}/>
          <Route path="/researchlogs" render={props=>(
            <ResearchLogs
              {...props}
              loggedInStatus={this.state.loggedInStatus}
              username={this.state.username}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
          )}/>
          <Route path="/scpclearancelevels" render={props=>(
            <SCPClearanceLevels
              {...props}
              loggedInStatus={this.state.loggedInStatus}
              username={this.state.username}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
          )}/>
          <Route path="/RAInfo"
                render={props => (
                <RaInfo 
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  username={this.state.username}
                  handleSuccessfulLogout={this.handleSuccessfulLogout}
                />
              )}/>
          <Route path="/RALogin"
                render={props => (
                  <RaLogin
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}/>
          {this.state.loggedInStatus === true 
          ? this.authdAdminPages()
          :null}

        </BrowserRouter>
        
      </div>
    );
  }
}

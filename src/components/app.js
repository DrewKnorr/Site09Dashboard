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

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/home" component={Home}/>
          <Route path="/recordLogs" component={RecordLogs}/>
          <Route path="/researchdocs" component={ResearchDocs}/>
          <Route path="/researchlogs" component={ResearchLogs}/>
          <Route path="/scpclearancelevels" component={SCPClearanceLevels}/>
          <Route path="/RAInfo"
                render={props => (
                <RaInfo 
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
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
        </BrowserRouter>
        
      </div>
    );
  }
}

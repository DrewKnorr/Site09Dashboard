import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar.js';
import UserControl from '../adminParts/raUserControl.js';

export default class RaAdminWindows extends Component {
    constructor(props) {
        super(props);
      }

    componentDidMount(){
    fetch("https://site-09-api.herokuapp.com/get/all/users", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
    }).then((response) => {
        response.json().then((body) => {
            console.log(body)
        });
    }) 
}

    
  render() {
    return (
        <div className='home-wrapper'>
            <div id='ra-adim-wrapper'>
                <div id='ra-admin-container'>
                    <div className='admin-item'>
                        <UserControl/>
                    </div>
                    <div className='admin-item'>
                        <p>Research Log Stats</p>
                    </div>
                </div>
                <div id='ra-admin-menu'>
                    <button>User Control</button>
                    <button>Research Log Stats</button>
                </div>
            </div>
            <div className='nav-wrapper'style={{zIndex:1,right:0,position:'absolute'}}>
                <NavBar
                    loggedInStatus={this.props.loggedInStatus}
                    username={this.props.username}
                    handleSuccessfulLogout={this.props.handleSuccessfulLogout}
                />
            </div>
      </div>
    );
  }
}



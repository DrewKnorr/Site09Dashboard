import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar.js';
export default class UserControl extends Component {
    constructor(props) {
        super(props);
      }

    componentDidMount(){
    fetch("http://127.0.0.1:5000/get/all/users", {
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
            <div id='user-control-wrapper'>
                <div id='user-menu'>
                    <button>Add New Admin</button>
                    <button>Update/Delete User</button>
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



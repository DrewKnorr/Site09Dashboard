import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar.js';
import UserControl from '../adminParts/raUserControl.js';

export default class RaAdminWindows extends Component {
    constructor(props) {
        super(props);
        this.state={
            usercontrol:'hidden',
            logstats:'hidden',
            profile:'hidden'
        }
        this.handleHide = this.handleHide.bind(this);
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

handleHide(event){
    console.log("TEST")
    if(event.target.value=='user'){
        if(this.state.usercontrol=='hidden'){
            this.setState({
                usercontrol:'visible',
                logstats:'hidden',
                profile:'hidden'
            })
        }
    }
    else if(event.target.value=='logstats'){
        if(this.state.logstats=='hidden'){
            this.setState({
                usercontrol:'hidden',
                logstats:'visible',
                profile:'hidden'
            })
        }
    }
    else if(event.target.value=='profile'){
        if(this.state.logstats=='hidden'){
            this.setState({
                usercontrol:'hidden',
                logstats:'hidden',
                profile:'visible'
            })
        }
    }

}


    
  render() {
    return (
        <div className='ra-wrapper'>
            <div id='ra-admin-wrapper'>
                <div id='ra-admin-container'>
                    <div className='admin-item' id='user' style={{visibility:this.state.usercontrol}}>
                        <UserControl/>
                    </div>
                    <div className='admin-item' style={{visibility:this.state.logstats}}>
                        <p>Research Log Stats</p>
                    </div>
                    <div className='admin-item' style={{visibility:this.state.profile}}>
                        <p>{this.props.username}</p>
                    </div>
                </div>
                <div id='ra-admin-menu'>
                    <button value='user' onClick={this.handleHide}>User Control</button>
                    <button value='logstats' onClick={this.handleHide}>Research Log Stats</button>
                    <button value='profile' onClick={this.handleHide}>{this.props.username}</button>
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



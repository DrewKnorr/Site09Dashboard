import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar';

export default class RAInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedIn:'visible'
    }
  }

  componentDidMount(){
    if(this.props.loggedInStatus==true){
      this.setState({
        loggedIn:'hidden'
      })
    }
  }
  render() {
    return (
      <div className='home-wrapper'>
        <div className='nav-wrapper'style={{zIndex:1,right:0,position:'absolute'}}>
            <NavBar
                loggedInStatus={this.props.loggedInStatus}
                username={this.props.username}
                handleSuccessfulLogout={this.props.handleSuccessfulLogout}
            />
        </div>
        <div id='ra-wrapper' >
            <div>
                <div id='text-wrapper'>
                  <h2>Research Department Administration:</h2>
                </div>
                <div id='ra-table'>
                  <div className='ra-item'>
                      <h1>
                        Director of Research:
                      </h1>
                      <h2>
                        Dr.Crawford
                      </h2>
                  </div>
                </div>
            </div>
            <div>
                <div id='text-wrapper'>
                  <h2>Current Schedule:</h2>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

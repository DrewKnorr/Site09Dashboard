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
        <div id='ra-wrapper' style={{width:"80vw", height:"90vh"}}>
            <div>
                <h2>Pull Content from #management-team channel</h2>
                
            </div>
            <div>
                <h2>Schedual</h2>
            </div>
        </div>
    </div>
    );
  }
}

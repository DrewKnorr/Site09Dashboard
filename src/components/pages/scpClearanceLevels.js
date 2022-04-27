import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar';

export default class RecordLogs extends Component {
  render() {
    return (
      <div className='home-wrapper'>
          <div className='nav-wrapper'style={{zIndex:1,right:0,position:'absolute'}}>
            <NavBar/>
          </div>
          <div id='clearance-levels' >
            <iframe
            style={{
                position:'absolute',
                top:0,
                width: "90%",
                height: "100%"
            }}
            src={`https://drive.google.com/file/d/1RjWA6IBGJHokwAhxXN4-_RCeHK_ljUXrcmrIxSS1Bkg/preview`}
            frameBorder="0"
            />
          </div>
      </div>
    );
  }
}

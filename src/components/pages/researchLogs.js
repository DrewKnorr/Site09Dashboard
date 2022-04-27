import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from '../parts/navbar';

export default class RecordLogs extends Component {
  constructor(props){
    super(props)
    this.getLogs=this.getLogs.bind(this);
  }

  getLogs(){

  }
  
  render() {
    return (
      <div className='home-wrapper'>
          <div className='nav-wrapper'style={{zIndex:1,right:0,position:'absolute'}}>
            <NavBar/>
          </div>
          <div id='log-content-wrapper' style={{width:"90vw", height:"90vh"}}>
            <div id='log-wrapper' style={{width:"90vw", height:"90vh"}}>
                <div id='log-contol-wrapper'>
                  <div>
                    <label>Researcher:</label>
                    <input></input>
                  </div>
                  <div>
                    <label>Rank:</label>
                    <input></input>
                  </div>
                  <div>
                    <label>Approved By:</label>
                    <input></input>
                  </div>
                  <div>
                    <label>SCP('s) Used:</label>
                    <input></input>
                  </div>
                  <div>
                    <button>TEST</button>
                  </div>
                </div>
                <div id='table-wrapper'>

                </div>
            </div>
          </div>
      </div>
    );
  }
}

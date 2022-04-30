import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar';

export default class RecordLogs extends Component {
  constructor(props) {
    super(props);
    this.state={
      rname:'Ex:Dr.Some Body',
      rrank:'Research Advisor',
      approvedby:'N/A',
      scpsused:'SCP-914',
      log:'https://docs.google.com/document/d/10iyI8RIoBeqVpFb1TxfgFgjTaKLKoY9MPR1Wy1LdMWU/edit?usp=sharing',
      errorText:''
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  
}

handleSubmit(event) {
  event.preventDefault();
  console.log(this.state);

  const data = {
    'rname':this.state.rname,
    'rrank': this.state.rrank,
    'approvedby':this.state.approvedby,
    'scpused':this.state.scpsused,
    'log':this.state.log
  };
  console.log(JSON.stringify(data))
  fetch('https://site-09-api.herokuapp.com/post/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({data}),
  }).then((response) => {
    response.json().then((body) => {
        this.setState({
          rname:'',
          rrank:'',
          approvedby:'',
          scpsused:'',
          log:'',
          errorText:''
        })
    });
  });

  return 
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
          <div id='log-wrapper'>
            <div id='error-wrapper'>
              <h2>{`${this.state.errorText}`}</h2>
            </div>
            <form>
              <div id='logo-wrapper'>
                <h1>SCP Record Research Logs:</h1>
              </div>
              <div className='form-item'> 
                <label>Researcher Name:</label>
                <input name='rname' value={this.state.rname} onInput={this.handleChange}/>
                <label>Researcher Rank:</label>
                {/* <input name='rrank' value={this.state.rrank} onInput={this.handleChange}/> */}
                <select value={this.state.rrank} onChange={this.handleChange}>
                  <option value="Research Apprentice">Research Apprentice</option>
                  <option value="Junior Researcher">Junior Researcher</option>
                  <option value="Researcher">Researcher</option>
                  <option value="Senior Researcher">Senior Researcher</option>
                  <option value="Research Specialist">Research Specialist</option>
                  <option value="Field Researcher">Field Researcher</option>
                  <option value="Research Advisor">Research Advisor</option>
                  <option value="Research Supervisor">Research Supervisor</option>
                  <option value="Research Overseer">Research Overseer</option>
                  <option value="Research Coordinator">Research Coordinator</option>
                  <option value="Director of Research">Director of Research</option>
                </select>
              </div>
              <div className='form-item'>
                <label>Approved By:</label>
                <input name='approvedby' value={this.state.approvedby} onInput={this.handleChange}/>
                <label>SCP('s) Used:</label>
                <input name='scpsused' value={this.state.scpsused} onInput={this.handleChange}/>
              </div>
              <div className='form-item'>
                <label>Log/Link to Log:</label>
                <textarea name='log' id='log-input' rows="25" cols="50" value={this.state.log} onInput={this.handleChange}/>
              </div>
              <div className='form-item'>
                <button type='submit' onClick={this.handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

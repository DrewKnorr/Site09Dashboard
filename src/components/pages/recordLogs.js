import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar';
import Logo from '../../../static/assets/photos/logo.png';

export default class RecordLogs extends Component {
  constructor(props) {
    super(props);
    this.state={
      rname:'',
      rrank:'',
      approvedby:'',
      scpsused:'',
      log:'',
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
                <div id='text-wrapper'>
                  <h1>Site-09 Research Department</h1>
                  <h2>Record New Log:</h2>
                </div>
                
                <img src={Logo} alt="SCP-Logo"/>
              </div>
              <div className='form-item'> 
                <label>Researcher Name:</label>
                <input name='rname' placeholder='Researcher Name' value={this.state.rname} onInput={this.handleChange}/>
                <label>Researcher Rank:</label>
                <select name='rrank' value={this.state.rrank} onChange={this.handleChange}>
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
                <input name='approvedby' placeholder='Approver Name or N/a' value={this.state.approvedby} onInput={this.handleChange}/>
                <label>SCP('s) Used:</label>
                <input name='scpsused' placeholder='Item Number(s)' value={this.state.scpsused} onInput={this.handleChange}/>
              </div>
              <div className='form-item'>
                <label>Log/Link to Log:</label>
                <textarea name='log'placeholder='Log or Link to Log Document' id='log-input' rows="25" cols="50" value={this.state.log} onInput={this.handleChange}/>
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

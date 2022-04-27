import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar';

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

  const data = new FormData();
  data.append('rname', this.state.rname);
  data.append('rrank', this.state.rrank);
  data.append('approvedby',this.state.approvedby);
  data.append('scpused',this.state.scpsused)
  data.append('log',this.state.log)

  fetch('https://site-09-api.herokuapp.com/post/log', {
    method: 'POST',
    body: data,
  }).then((response) => {
    response.json().then((body) => {
        console.log(body);
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
          <div className='nav-wrapper'>
            <NavBar/>
          </div>
          <div id='log-wrapper' style={{width:"80vw", height:"90vh"}}>
              <form>
                <div>
                  <h2>SCP Research Logs:</h2>
                </div>
                <div> 
                  <label>Researcher Name:</label>
                  <input name='rname' onInput={this.handleChange}/>
                  <label>Researcher Rank:</label>
                  <input name='rrank' onInput={this.handleChange}/>
                </div>
                <div>
                  <label>Approved By:</label>
                  <input name='approvedby' onInput={this.handleChange}/>
                  <label>SCP('s) Used:</label>
                  <input name='scpsused' onInput={this.handleChange}/>
                </div>
                <div>
                  <label>Log/Link to Log:</label>
                  <input name='log' onInput={this.handleChange}/>
                </div>
                <div>
                  <button type='submit' onclick={this.handleSubmit}>Submit</button>
                </div>
              </form>
          </div>
      </div>
    );
  }
}

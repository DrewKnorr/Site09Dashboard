import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from '../parts/navbar';
import Logo from '../../../static/assets/photos/logo.png';

export default class RecordLogs extends Component {
  constructor(props){
    super(props)
    this.state={
      logs:{},
      rname:'',
      rrank:'',
      approvedby:'',
      scpsused:''
    }
    this.buildLogs = this.buildLogs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  
  }

  search(){
    const data = {
      'rname':this.state.rname,
      'rrank': this.state.rrank,
      'approvedby':this.state.approvedby,
      'scpsused':this.state.scpsused
    };

    fetch("https://site-09-api.herokuapp.com/get/logs/filtered", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({data})
    }).then((response) => {
        response.json().then((body) => {
            console.log(body);
            this.buildLogs(body);
        });
    })
    console.log(this.state.rname, this.state.rrank, this.state.approvedby, this.state.scpsused)
  }

  buildLogs(response){
    let wrapper = document.getElementById("table-wrapper");
    wrapper.innerHTML='';

    let firstTempDiv = document.createElement("div");
    firstTempDiv.className = `log-item`

    let firstTempId = document.createElement("p");
    firstTempId.innerHTML=`ID:`
    firstTempId.className='id-wrapper'

    let firstTemprname = document.createElement("p");
    firstTemprname.innerHTML=`Researcher Name:`
    firstTemprname.className=`name-wrapper`

    let firstTemprrank = document.createElement("p");
    firstTemprrank.innerHTML=`Researcher Rank:`
    firstTemprrank.className=`rank-wrapper`

    let firstTempSCP = document.createElement("p");
    firstTempSCP.innerHTML=`Approved By:`
    firstTempSCP.className=`scp-wrapper`

    let firstapprovedBy = document.createElement("p");
    firstapprovedBy.innerHTML=`SCP's Used:`
    firstapprovedBy.className=`approved-wrapper`

    let firstlog = document.createElement("p");
    firstlog.innerHTML=`Log:`
    firstlog.className=`log-wrapper`

    let firsttimeStamp = document.createElement("p");
    firsttimeStamp.innerHTML=`Time:`
    firsttimeStamp.className=`time-wrapper`

    firstTempDiv.appendChild(firstTempId);
    firstTempDiv.appendChild(firstTemprname);
    firstTempDiv.appendChild(firstTemprrank);
    firstTempDiv.appendChild(firstapprovedBy);
    firstTempDiv.appendChild(firstTempSCP);
    firstTempDiv.appendChild(firstlog);
    firstTempDiv.appendChild(firsttimeStamp);

    wrapper.appendChild(firstTempDiv)

    for(let i=0; i<response.Logs.length ;i++){

      let tempDiv = document.createElement("div");
      tempDiv.className = `log-item`

      let tempId = document.createElement("p");
      tempId.innerHTML=`${response.Logs[i].id}`
      tempId.className='id-wrapper'

      let temprname = document.createElement("p");
      temprname.innerHTML=`${response.Logs[i].rname}`
      temprname.className=`name-wrapper`

      let temprrank = document.createElement("p");
      temprrank.innerHTML=`${response.Logs[i].rrank}`
      temprrank.className=`rank-wrapper`

      let tempSCP = document.createElement("p");
      tempSCP.innerHTML=`${response.Logs[i].scpused}`
      tempSCP.className=`scp-wrapper`

      let approvedBy = document.createElement("p");
      approvedBy.innerHTML=`${response.Logs[i].approvedby}`
      approvedBy.className=`approved-wrapper`

      let log = document.createElement("p");
      log.innerHTML=`${response.Logs[i].log}`
      log.className=`log-wrapper`

      let timeStamp = document.createElement("p");
      timeStamp.innerHTML=`${response.Logs[i].timeStamp}`
      timeStamp.className=`time-wrapper`

      tempDiv.appendChild(tempId);
      tempDiv.appendChild(temprname);
      tempDiv.appendChild(temprrank);
      tempDiv.appendChild(approvedBy);
      tempDiv.appendChild(tempSCP);
      tempDiv.appendChild(log);
      tempDiv.appendChild(timeStamp);

      wrapper.appendChild(tempDiv)
    }

  }

  componentDidMount(){
    fetch("https://site-09-api.herokuapp.com/get/logs", {
        method: "GET",
        headers: { 'Content-Type': 'application/json'},
    }).then((response) => {
        response.json().then((body) => {
            this.setState({
              logs:body
            })
            this.buildLogs(body);
        });
    }) 
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
          <div id='log-content-wrapper' >
            <div id='log-review-wrapper' >
              <div id='log-review-container'>
                <div id='log-contol-wrapper'>
                    <div className='log-menu-item'>
                      <h2>Researcher:</h2>
                      <input name='rname' value={this.state.rname} onInput={this.handleChange}/>
                    </div>
                    <div className='log-menu-item'>
                      <h2>Rank:</h2>
                      <select name='rrank' value={this.state.rrank} onChange={this.handleChange}>
                        <option value="">None</option>
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
                    <div className='log-menu-item'>
                      <h2>Approved By:</h2>
                      <input name='approvedby' value={this.state.approvedby} onInput={this.handleChange}/>
                    </div>
                    <div className='log-menu-item'>
                      <h2>SCP('s) Used:</h2>
                      <input name='scpsused' value={this.state.scpsused} onInput={this.handleChange}/>
                    </div>
                    <div className='log-menu-item'>
                      <button onClick={this.search}>[ Search ]</button>
                    </div>
                  </div>
                  <div id='log-menu-logo'>
                    <img src={Logo}/>
                  </div>
              </div>
            </div>
            <div id='table-wrapper'>
              <div className='log-item'>
                <p className='id-wrapper'>ID:</p>
                <p className='name-wrapper'>Researcher Name:</p>
                <p className='rank-wrapper'>Researcher Rank:</p>
                <p className='approved-wrapper'>Approved By:</p>
                <p className='scp-wrapper'>SCP's Used:</p>
                <p className='log-wrapper'>Log:</p>
                <p className='time-wrapper'>Time:</p>
              </div>

            </div>
          </div>
      </div>
    );
  }
}

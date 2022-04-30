import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from '../parts/navbar';

export default class RecordLogs extends Component {
  constructor(props){
    super(props)
    this.state={
      logs:{}
    }
    this.buildLogs = this.buildLogs.bind(this);
  }

  buildLogs(response){
    let wrapper = document.getElementById("table-wrapper");
    console.log(response.Logs);
    for(let i=0; i<response.Logs.length ;i++){
      console.log(response.Logs[i])
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

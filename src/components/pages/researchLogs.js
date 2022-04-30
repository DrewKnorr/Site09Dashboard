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

      let tempId = document.createElement("h2");
      tempId.innerHTML=`ID: ${response.Logs[i].id}`

      let temprname = document.createElement("h2");
      temprname.innerHTML=`Research Name: ${response.Logs[i].rname}`

      let temprrank = document.createElement("h2");
      temprrank.innerHTML=`Research Rank: ${response.Logs[i].rrank}`

      let tempSCP = document.createElement("h2");
      tempSCP.innerHTML=`SCP's Used: ${response.Logs[i].scpused}`

      let approvedBy = document.createElement("h2");
      tempSCP.innerHTML=`Approved By: ${response.Logs[i].approvedby}`

      let log = document.createElement("h2");
      log.innerHTML=`Log: ${response.Logs[i].log}`

      let timeStamp = document.createElement("h2");
      timeStamp.innerHTML=`Time: ${response.Logs[i].timeStamp}`

      tempDiv.appendChild(tempId)
      tempDiv.appendChild(temprname)
      tempDiv.appendChild(temprrank)
      tempDiv.appendChild(approvedBy)
      tempDiv.appendChild(log)
      tempDiv.appendChild(timeStamp)

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

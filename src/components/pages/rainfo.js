import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// const { Client, Intents } = require('discord.js');
// const { token } = require('./config.json');

// import {*}  from 'discord.js';

import NavBar from '../parts/navbar';

export default class RAInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedIn:'visible',
      // client:new Client({ intents: [Intents.FLAGS.GUILDS] })
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
                  <h1>Research Department Administration:</h1>
                </div>
                <div id='ra-table'>
                  <div className='ra-item'>
                      <h1>
                        Director of Research:
                      </h1>
                      <h2>
                        Dr.Simon Hathfield
                      </h2>
                  </div>
                  <div className='ra-item'>
                      <h1>
                        Research Coordinator: 
                      </h1>
                      <h2>
                        TBD
                      </h2>
                  </div>
                  <div className='ra-item'>
                      <h1>
                        Research Overseers: 
                      </h1>
                      <h2>
                        Dr. Everett
                      </h2>
                      <h2>
                        Dr. William "Void" Schultz
                      </h2>
                  </div>
                  <div className='ra-item'>
                      <h1>
                        Research Supervisors: 
                      </h1>
                      <h2>
                        Dr. Ken Adams  <p>(General Research Lead)</p>
                      </h2>
                      <h2>
                        Dr. Green  <p>(Biology Research Lead)</p>
                      </h2>
                      <h2>
                        Dr. Jeff  <p>(Medical Research Lead)</p>
                      </h2>
                  </div>
                  <div className='ra-item'>
                      <h1>
                        Research Supervisors: 
                      </h1>
                      <h2>
                        Dr Burger   <p>(General Co-Lead)</p>
                      </h2>
                      <h2>
                        Dr. Allbright   <p>(Biology Co-Lead)</p>
                      </h2>
                      <h2>
                        TBD <p>(Medical Co-Lead)</p>
                      </h2>
                  </div>
                </div>
            </div>
            {/* <div>
                <div id='text-wrapper'>
                  <h2>Current Schedule:</h2>
                </div>
            </div> */}
        </div>
    </div>
    );
  }
}

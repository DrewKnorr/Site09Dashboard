import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



import Logo from '../../../static/assets/photos/ResearchLogo.png';
import NavBar from '../parts/navbar';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

   
    login(event){
        this.props.history.push('/home')
    }

  render() {
    return (
        <div className='home-wrapper'>
            <div className='login-wrapper'>
                <img src={Logo}></img>
                <button onClick={this.login}>[ Enter ]</button>
            </div>
      </div>
    );
  }
}



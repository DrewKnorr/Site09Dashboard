import React, { Component } from "react";
import md5 from 'md5-hash'

import Logo from '../../../static/assets/photos/logoRa.png';
import NavBar from '../parts/navbar.js';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  handleSubmit(event) {
      if(this.state.username=='' | this.state.password == ''){
        if(this.state.username==''){
          let tempUser = document.getElementById('username')
          tempUser.style.boxShadow = '0px 0px 2.5px 0px rgba(255,0,0,0.75) inset'
        }
        if(this.state.password==''){
          let tempPw = document.getElementById('password')
          tempPw.style.boxShadow = '0px 0px 2.5px 0px rgba(255,0,0,0.75) inset'
        }
        this.setState({
          errorText:"Invalid Username/Password"
        })
      }else{
        fetch("https://site-09-api.herokuapp.com/admin/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username:this.state.username,
                    password: md5(this.state.password)
                })
            }).then((response) => {
              response.json().then((body) => {
                let values = Object.values(body)
                // (values)
                if(Object.keys(body)[0]=="errText"){
                  this.setState({
                    errorText:Object.values(body)
                  })
                }
                else{
                  // (body)
                  
                  this.props.handleSuccessfulLogin(body);
                  this.props.history.push("/home")
                  
                }
                  console.log(body)
              });
            })
      }
      
    event.preventDefault();
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
          <div id='ra-login-wrapper'>
            <div>
              <img src={Logo}/>
            </div>
            <div id='login-wrapper'>
              <h2>Research Administration: </h2>

              <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <div id='login-button-wrapper'>
                  <button type="submit">[    Login    ]</button>
                </div>
              </form>
              <div id='error-wrapper'><h2>{this.state.errorText}</h2></div>
            </div>
            
          </div>
        <div>
      </div>
    </div>
    );
  }
}
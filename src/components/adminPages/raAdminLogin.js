import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import axios from "axios";

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

      fetch("https://site-09-api.herokuapp.com/admin/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username:this.state.username,
                    password: this.state.password
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
               
            
    event.preventDefault();
  }
      
  render() {
    return (
      <div>
        <h4>Research Administration: </h4>

        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import md5 from 'md5-hash'


class UserControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            errorText:'',
            newUser:'hidden',
            editUser:'hidden',
            username:'',
            email:'',
            role:'1',
            password:'',
            confrimPassword:'',
            response:{},
            delErrMsg:''

        }

        this.fetchUsers = this.fetchUsers.bind(this);
      }


    fetchUsers(){
      fetch("https://site-09-api.herokuapp.com/get/user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            username:this.props.username
        })
      }).then((response) => {
          response.json().then((body) => {
              if(Object.keys(body)[0]=="errText"){
                  console.log(body.errText)
                  let temp=body.errText
                  this.setState({
                    errorText:temp
                  })
                }
                else{
                //   this.buildTable(body);
                  let response = {}
                  console.log(body)
                //   for(let i=0; i<body.Users.length;i++){
                //     response[`${body.Users[i].id}`] = body.Users[i]
                //   }
                  this.setState({
                    response:body
                  })
                }
          });
      }) 
    }

    componentDidMount(){
      this.fetchUsers();
    }

    handleSubmit(event) {
      event.preventDefault();
      console.log(this.state);
      
    }

    
  render() {
    return (
      <div id='profile-wrapper'>
          <div id='profile-contianer'>
              <h3>Username: <p>{this.state.response.username}</p></h3>
              <h3>Email: <p>{this.state.response.email}</p></h3>
              <div id='profile-menu'>
                  <button>Change Password</button>
                  <button>Change Username</button>
                  <button>Change Email Address</button>
              </div>
              
          </div>

          <div id='error-wrapper'>
              <h1>{this.state.errorText}</h1>
          </div>
      </div>
    );
  }
}

export default UserControl


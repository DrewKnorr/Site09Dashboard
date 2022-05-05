import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



class UserControl extends Component {
    constructor(props) {
        super(props);
      }

    componentDidMount(){
        console.log("test")
    fetch("https://site-09-api.herokuapp.com/get/all/users", {
        method: "GET",
        headers: { 'Content-Type': 'application/json'},
    }).then((response) => {
        response.json().then((body) => {
            console.log(body)
        });
    }) 
}

    
  render() {
    return (
        <div className='home-wrapper'>
            <div>TEST</div>
      </div>
    );
  }
}

export default UserControl


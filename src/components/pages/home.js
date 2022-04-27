import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



import Logo from '../../../static/assets/photos/ResearchLogo.png';
import NavBar from '../parts/navbar';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state={
            welcome:'[ Welcome To The Foundation Site-09 Researcher Dashboard ]',
            builtWelcome:''
        }

        this.buildString = this.buildString.bind(this);
    }

    buildString(){
        let tempWelcome = this.state.welcome;
        console.log(tempWelcome)
        if(tempWelcome.length>0){
            this.setState({
                welcome:tempWelcome.slice(1),
                builtWelcome:`${this.state.builtWelcome}`+ `${this.state.welcome[0]}`
            })
        }else{
            clearInterval(this.interval);
        }
    }

    
    componentDidMount(){
        this.interval = setInterval(() => this.buildString(), 80);
    }
  render() {
    return (
        <div className='home-wrapper'>
            <div id='dashboard-wrapper'>
                <h2>{`${this.state.builtWelcome}`}</h2>
                <div id='highlight-container'>
                    <div className='highlight-item'>

                    </div>
                </div>
            </div>
            <div className='content-wrapper'>
                <NavBar/>
            </div>
      </div>
    );
  }
}



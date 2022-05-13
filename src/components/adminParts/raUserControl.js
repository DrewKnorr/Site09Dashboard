import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



class UserControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            errorText:'',
            newUser:'hidden',
            username:'',
            email:'',

        }

        this.buildTable = this.buildTable.bind(this);
        this.newUser = this.newUser.bind(this);
        this.closeNewUser = this.closeNewUser.bind(this);
      }

    buildTable(users){
        let table = document.getElementById('users-table');
        table.innerHTML='';

        let firstTempDiv = document.createElement("div");
        firstTempDiv.className = `user-item`;

        let firstUserId= document.createElement("p");
        firstUserId.innerHTML='ID:';
        firstUserId.className='id-wrapper';

        let firstUsername=document.createElement("p");
        firstUsername.innerHTML='Username:';
        firstUsername.className='username-wrapper';

        let firstEmailAuthed=document.createElement("p");
        firstEmailAuthed.innerHTML='Is Email Authenicated:';
        firstEmailAuthed.className='email-authed-wrapper';

        let firstEdit=document.createElement("p");
        firstEdit.innerHTML='';
        firstEdit.className='edit-user-wrapper';

        firstTempDiv.appendChild(firstUserId);
        firstTempDiv.appendChild(firstUsername);
        firstTempDiv.appendChild(firstEmailAuthed);
        firstTempDiv.appendChild(firstEdit);
        table.appendChild(firstTempDiv);

        for(let i=0; i<users.Users.length; i++){
            let tempDiv = document.createElement("div");
            tempDiv.className = `user-item`;
    
            let userId= document.createElement("p");
            userId.innerHTML=users.Users[i].id;
            userId.className='id-wrapper';
    
            let username=document.createElement("p");
            username.innerHTML=users.Users[i].username;
            username.className='username-wrapper';
    
            let emailAuthed=document.createElement("p");
            emailAuthed.innerHTML=users.Users[i].email_authed;
            emailAuthed.className='email-authed-wrapper';

            let editUser=document.createElement("button");
            editUser.innerHTML="Edit"
            editUser.className='edit-user-wrapper';
    
            tempDiv.appendChild(userId);
            tempDiv.appendChild(username);
            tempDiv.appendChild(emailAuthed);
            tempDiv.appendChild(editUser);
            table.appendChild(tempDiv);
        }

        
        console.log(users)
    }

    componentDidMount(){
        console.log("test")
    fetch("https://site-09-api.herokuapp.com/get/all/users", {
        method: "GET",
        headers: { 'Content-Type': 'application/json'},
    }).then((response) => {
        response.json().then((body) => {
            if(Object.keys(body)[0]=="errText"){
                this.setState({
                  errorText:Object.values(body)
                })
              }
              else{
                this.buildTable(body);
                
              }
        });
    }) 
    }

    newUser(event){
      this.setState({
        newUser:'visible'
      })
    }
    closeNewUser(event){
      this.setState({
        newUser:'hidden'
      })
    }


    
  render() {
    return (
      <div id='user-wrapper'>
          <div>Admin Users</div>
          <div id='users-table'>

          </div>
          <div id='button-wrapper'>
            <button onClick={this.newUser}>New User</button>
          </div>
          <div id='new-user-wrapper' style={{visibility:this.state.newUser}}>
            <div id='new-user-container'>
              <button onClick={this.closeNewUser}>X</button>
              <h2>New User</h2>
              <form>
                <label for='username'>Username:</label>
                <input name='usename'/>
                <label for='email'>Email Address:</label>
                <input name='email'/>
                
              </form>
            </div>
          </div>
      </div>
    );
  }
}

export default UserControl


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
            errorMessage:'',
            response:{},
            active:{},
            delErrMsg:''

        }

        this.buildTable = this.buildTable.bind(this);
        this.newUser = this.newUser.bind(this);
        this.closeNewUser = this.closeNewUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editUser = this.editUser.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
      }

    editUser(event){
      console.log(this.state.response[event.target.value]);
      this.setState({
        active:this.state.response[event.target.value],
        editUser:'visible'
      });

      let container = document.getElementById('edit-user-wrapper');
      container.innerHTML =''

      let textWrapper = document.createElement("div");
      textWrapper.id='text-wrapper';
      
      let userName = document.createElement("p");
      userName.innerHTML = 'Username: '+this.state.response[event.target.value].username;

      let email = document.createElement("p");
      email.innerHTML = 'Email: '+this.state.response[event.target.value].email;


      textWrapper.appendChild(userName);
      textWrapper.appendChild(email);


      let resetPW =  document.createElement("button");
      resetPW.innerHTML='[   Reset Password    ]'

      let closeBtn = document.createElement("button");
      closeBtn.addEventListener("click",this.closeEdit);
      closeBtn.innerHTML='X'


      let closeWrapper = document.createElement("div");
      closeWrapper.id='close-wrapper';

      closeWrapper.appendChild(closeBtn);


      let removeBtn = document.createElement("button");
      removeBtn.value=this.state.response[event.target.value].id;
      removeBtn.addEventListener("click",this.handleDelete);
      removeBtn.innerHTML='[  Remove User  ]';
      
      // let updateBtn = document.createElement("button");
      // updateBtn.value=this.state.response[event.target.value].id;
      // updateBtn.innerHTML='Update Username';

      container.appendChild(closeWrapper);
      container.appendChild(textWrapper);
      container.appendChild(resetPW);
      container.appendChild(removeBtn);
      
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
            editUser.value = users.Users[i].id;
            editUser.addEventListener("click",this.editUser)
    
            tempDiv.appendChild(userId);
            tempDiv.appendChild(username);
            tempDiv.appendChild(emailAuthed);
            tempDiv.appendChild(editUser);
            table.appendChild(tempDiv);
        }
    }

    fetchUsers(){
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
                  let response = {}
                  for(let i=0; i<body.Users.length;i++){
                    response[`${body.Users[i].id}`] = body.Users[i]
                  }
                  this.setState({
                    response:response
                  })
                }
          });
      }) 
    }

    componentDidMount(){
      this.fetchUsers();
    }

    closeEdit(event){
      this.setState({
        editUser:'hidden'
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

    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    
    }

    handleSubmit(event) {
      event.preventDefault();
      console.log(this.state);
      let md5Hash=require("md5-hash");
      md5Hash.default(this.state.password)

      let data ={
        "username":this.state.username.toLowerCase(),
        "email":this.state.email.toLowerCase(),
        "password":md5(this.state.password),
        "role":this.state.role
      }
      console.log(data)
      if(this.state.email!='' & this.state.username!='' & this.state.password!='' & this.state.confrimPassword!=''){
        if(this.state.password == this.state.confrimPassword){
          fetch('https://site-09-api.herokuapp.com/create/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({data}),
          }).then((response) => {
            response.json().then((body) => {
              console.log(body)
              if(Object.keys(body)[0]=="errText"){
                this.setState({
                  errorText:Object.values(body)
                })
                this.closeNewUser();
              }
              else{
                this.setState({
                  username:'',
                  email:'',
                  role:'1',
                  password:'',
                  confrimPassword:''
                })
                this.fetchUsers();
                this.closeNewUser();
              }
            });
          });
          
        }
        else{
          this.setState({
            errorMessage:'Password does not match'
          })
        }
        
      }
      else{
        if(this.state.email=='' || this.state.username=='' || this.state.password =='' || this.state.confrimPassword==''){
          this.setState({
            errorMessage:'Username/Email Required'
          })
        }
      }
      
    }

    handleDelete(event){
      let contiune = confirm("Are you sure you wish to delete this user? ")

      if(contiune == true){
        fetch(`https://site-09-api.herokuapp.com/delete/admin/${event.target.value}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json'}
        }).then((response) => {
          response.json().then((body) => {
            if(Object.keys(body)[0]=="data"){
              this.fetchUsers();
              this.closeEdit();
            }else{
              // this.setState({delErrMsg:"There was an error deleting user, please see logs"})
              alert("There was an error deleting user, please see logs")
              this.fetchUsers();
              this.closeEdit();
            }
          });
        });
      }
      else{
        this.fetchUsers();
        this.closeEdit();
      }
      
    }
    
  render() {
    return (
      <div id='user-wrapper'>
          <div id='user-text-wrapper'><h1>Admin Users</h1></div>
          <div id='users-table'>

          </div>
          <div id='button-wrapper'>
            <button onClick={this.newUser}>New User</button>
          </div>
          <div id='edit-user-wrapper' style={{visibility:this.state.editUser}}>

          </div>
          <div id='new-user-wrapper' style={{visibility:this.state.newUser}}>
            <div id='new-user-container'>
              <div id='close-button-wrapper'>
                <button onClick={this.closeNewUser}>X</button>
              </div>
              <h2>New User</h2>
              <form>
                <label for='username' >Username:</label>
                <input name='username'onChange={this.handleChange}/>
                <label for='email'>Email Address:</label>
                <input name='email' onChange={this.handleChange}/>
                <label for='password'>Password:</label>
                <input type='password' name='password' onChange={this.handleChange}/>
                <label for='confrimPassword'>Confirm Password:</label>
                <input type='password' name='confrimPassword' onChange={this.handleChange}/>
                <label for='role'>Role</label>
                <select name='role' value={this.state.rrank} onChange={this.handleChange}>
                  <option value="1">Admin</option>
                </select>
              </form>
              <div id='user-button-wrapper'>
                <button onClick={this.handleSubmit}>Submit</button>
              </div>
              <div id='error-wrapper'>
                <h3>{this.state.errorMessage}</h3>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default UserControl


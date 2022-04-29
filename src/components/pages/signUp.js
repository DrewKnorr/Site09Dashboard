import React, {Component} from "react";
import SignUp from "../auth/sign-up/sign-up-form"



export default class Auth extends Component {

  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth() {
    this.props.handleSuccessfulLogin();
    this.props.history.push("/");
  }

  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();
  }



  render() {
    return (
      <div className="auth-page-wrapper">
        <div
          className="left-column"
        />

        <div className="right-column">
          <SignUp
            {...this.props}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
          />
        </div>
      </div>
    );
  }
}
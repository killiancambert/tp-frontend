import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Register.css";

var SERVER = 'backend.cleverapps.io';
var PROTOCOL = window.location.protocol;

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password:'',
      email:'',
      error:"",
    };
  }

  handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    let loginInput = this.state.login;
    let passwordInput = this.state.password;
    let emailInput = this.state.email;

    const sendRegister = async (login, password, email) => {
      const response = await fetch(`${PROTOCOL}//${SERVER}/subscribe`, {
        method: 'POST',
        body: JSON.stringify({
          "username": login,
          "password": password,
          "email": email,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const registerResponseValue = await response.text();
      if (!registerResponseValue.ok) {
        this.setState({error: registerResponseValue});
      } else {
        this.setState({error: 'Le compte a été créé'});
        window.location.replace("/chat");
      }
    }
    sendRegister(loginInput.value, passwordInput.value, emailInput.value)
  }  

  render() {

    return (
      <div className="mainContainer">
        <div id="register">
          <h2>Inscription</h2>
          <form className="registerform" onSubmit={this.handleSubmit}>
            <input name="login" placeholder="Login" className="input" type="text" value={this.state.value} onChange={this.handleChange} />
            <input name="password" placeholder="Password" className="input" type="password" value={this.state.value} onChange={this.handleChange} />
            <input name="email" placeholder="Email" className="input" type="email" value={this.state.value} onChange={this.handleChange} />
            <div className="create-account">
                <button type="submit">Submit</button>
                <small>
                  <NavLink to="/Login">
                    Already Have an Account ? Click here !
                  </NavLink>
                </small>
              </div>
          </form>   
        </div>
      </div>
      
    );
  }
}


export default Register
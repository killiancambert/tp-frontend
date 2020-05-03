import React from 'react';

var SERVER = 'backend.cleverapps.io';
var PROTOCOL = window.location.protocol;

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password:'',
      email:'',
      error:'',
    };
  }

  handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
  }
  
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
        this.setState({error: 'Le compte a été créé'});;
      }
    }
    sendRegister(loginInput.value, passwordInput.value, emailInput.value)
  }

  render() {
    return (
      <div id="register">
        <h2>Inscription</h2>
        <form className="registerform" onSubmit={this.handleSubmit}>
          <label>Login: <input name="login" className="input" type="text" value={this.state.value} onChange={this.handleChange} /></label>
          <label>Password: <input name="password" className="input" type="password" value={this.state.value} onChange={this.handleChange} /></label>
          <label>Email: <input name="email" className="input" type="email" value={this.state.value} onChange={this.handleChange} /></label>
          <input className="submit" type="submit" value="Submit" />
        </form>  
        <div>{this.state.error}</div>    
      </div>
    )
  }
}

export default Register
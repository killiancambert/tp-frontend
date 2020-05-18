import React from 'react';
import { NavLink } from "react-router-dom";
import "./Login.css";

const SERVER = 'backend.cleverapps.io';
const PROTOCOL = window.location.protocol;
const WS_PROTOCOL = PROTOCOL === 'https:' ? 'wss:' : 'ws:';
const WS_SERVER = `${WS_PROTOCOL}//${SERVER}`;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password:'',
      error: '',
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

    const sendLogin = async (login, password) => {
      const response = await fetch(`${PROTOCOL}//${SERVER}/login`, {
        method: 'POST',
        body: JSON.stringify({
          "username": login,
          "password": password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const loginResponseValue = await response.text();
      if (loginResponseValue.ok) {
        this.setState({error: loginResponseValue});
        return;
      }
      const ticketResponse = await fetch(`${PROTOCOL}//${SERVER}/wsTicket`, {
        method: 'GET',
        credentials: 'include'
      });

      const ticketResponseValue = await ticketResponse.text();
      console.log(ticketResponseValue);
      if (!ticketResponse.ok) {
        this.setState({error: ticketResponseValue});
      } else {
        this.setState({error: 'Vous êtes connecté !'});
        window.location.replace("/chat");
      }
    }
    sendLogin(loginInput, passwordInput)
  }

  render() {
    return (
      <div className="mainContainer">
        <div id="login">
          <h2>Connexion</h2>
          <form className ="loginform" onSubmit={this.handleSubmit}>
            <input className="input" placeholder="Login" name="login" type="text" value={this.state.value} onChange={this.handleChange} />
            <input className="input" placeholder="Password" name="password" type="password" value={this.state.value} onChange={this.handleChange} />
            <div className="create-account">
                <button type="submit">Connection</button>
                <small>
                  <NavLink to="/">
                    You do not have an account ? Click here !
                  </NavLink>
                </small>
              </div>
          </form>
        </div>
      </div>
      
    )
  }
}

export default Login
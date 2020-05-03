import React from 'react';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password:'',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

  render() {
    return (
      <div id="login">
        <h2>Connexion</h2>
        <form className ="loginform">
          <label>Login: <input className="input" name="login" type="text" value={this.state.value} onChange={this.handleChange} /></label>
          <label>Password: <input className="input" name="password" type="password" value={this.state.value} onChange={this.handleChange} /></label>
          <input className="submit" type="submit" />
        </form>
      </div>
    )
  }
}

export default Login
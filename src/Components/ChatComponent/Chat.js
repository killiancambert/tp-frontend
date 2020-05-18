import React from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import * as backendAPI from "../../api";
import "./Chat.css";

const formValid = ({ errorsForm, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(errorsForm).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === "" && (valid = false);
  });

  return valid;
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: [],
      positions: {},

      errorsForm: {
        message: "",
      },
    };
    this.textDiv = React.createRef();
    this.nameInput = React.createRef();
    this.ws = "";
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      this.ws.send(`msg: ${this.state.message}`);
      this.setState({ message: "" });
      this.nameInput.focus();
    } else {
      console.error("Invalid Form");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorsForm = { ...this.state.errorsForm };

    switch (name) {
      case "message":
        errorsForm.message =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ errorsForm, [name]: value });
  };

  async autoLogin() {
    const response = await backendAPI.status();
    const responseValue = await response.text();
    if (responseValue !== "Visiteur") {
      await this.connectToChat();
    }
  }

  async connectToChat() {
    console.log("Connexion au serveur en cours…");
    const ticketResponse = await backendAPI.wsTicket();
    const ticketResponseValue = await ticketResponse.text();
    if (ticketResponse.ok) {
      this.ws = await backendAPI.startWebsocket(
        ticketResponseValue,
        this.handleWSMessage,
        this.disconnect
      );
      console.log("Connecté !");
    } else {
      console.log(ticketResponseValue);
    }
  }

  handleWSMessage = (msg) => {
    let split = msg.data.split(":").map((space) => space.trim());
    if (split[1] === "msg") {
      let text = msg.data.replace(backendAPI.MSG_PREFIX, "");
      this.setState({ messages: [...this.state.messages, text] });
    } else if (split[1] === "mov") {
      let splitPosition = split[2].split(",");
      let x = Math.abs(parseInt(splitPosition[0]));
      let y = Math.abs(parseInt(splitPosition[1]));
      let user = split[0];
      if (x > 500) {
        x = 500;
      }
      if (y > 500) {
        y = 500;
      }
      this.setState({
        positions: { ...this.state.positions, [user]: { x, y } },
      });
    } else {
      this.setState({ messages: [...this.state.messages, msg.data] });
    }
  };
  disconnect() {
    if (this.ws != null) this.ws.close();
    console.log("Disconnected");
    alert("You are Disconnected :( \nPlease reload the page !");
  }

  sendPosition = (event) => {
    let containerMap = this.textDiv.current.getBoundingClientRect();
    this.ws.send(
      `mov:${event.clientX - containerMap.x},${event.clientY - containerMap.y}`
    );
  };

  componentDidMount() {
    this.autoLogin();
  }


  render() {

    return (
      <div className="main-container">
        <div className="chat">
          <h2>Chat</h2>
          <form className="chat-form" onSubmit={this.handleSubmit} noValidate>
            <input className="message" name="message" placeholder="Write something ..." noValidate value={this.state.message} onChange={this.handleChange} ref={(input) => { this.nameInput = input; }} />
            <div className="container-send">
              <button className="send-message" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className="container">
          <div className="container-message">
            <h2>Messages</h2>
            <ScrollToBottom className="messages">
              {this.state.messages.map((message, i) => (
                <div key={i}>• {message}</div>
              ))}
            </ScrollToBottom>
          </div>
          <div className="map">
            <h2>Map</h2>
            <div className="container-map" onClick={this.sendPosition} ref={this.textDiv}>
              {Object.entries(this.state.positions).map(
                ([user, position], key) => (
                  <div className="map-message" key={key} style={{ top: `${position.y}px`, left: `${position.x}px` }}> {user}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;

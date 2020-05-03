import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">

      <div id="chat">
        <h2>Chat</h2>
        <form className="chatform">
          <input name="message" className="input" />
          <input className="submit" type="submit" />
        </form>
        <ul className="messages"></ul>
      </div>
    </div>

    
  );
}

export default App;

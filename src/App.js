import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Register from "./Components/RegisterComponent/Register"
import Login from "./Components/LoginComponent/Login"
import Chat from "./Components/ChatComponent/Chat"

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/chat" component={Chat} />
    </Router>
  )
}

export default App
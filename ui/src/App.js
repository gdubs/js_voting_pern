import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Polls from "./components/polls/polls";
import Poll from "./components/poll/poll";
import Login from "./components/login/login";
import ProtectedRoute from "./components/routes/protected_route";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/polls">My Polls</Link>
              </li>
            </ul>
          </header>
          <main>
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute exact path="/polls" component={Polls} />
              <ProtectedRoute path="/polls/:id" component={Poll} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

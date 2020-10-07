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
            </ul>
          </header>
          <main>
            <Switch>
              <Route exact path="/polls">
                <Polls />
              </Route>
              <Route path="/polls/:id">
                <Poll />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

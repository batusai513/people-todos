import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import {
  getTodos,
  todosByUser,
  getUserTodos,
  getUserIdFromMatch
} from "./modules/todos";
import { keys } from "ramda";
import "./App.css";

class App extends Component {
  state = {
    todosByUser: {},
    state: "loading", // success, error
    error: ""
  };

  componentDidMount() {
    this.setState({ state: "loading" });
    getTodos()
      .then(({ data }) => {
        this.setState({ state: "success", todosByUser: todosByUser(data) });
      })
      .catch(err => {
        this.setState({
          state: "error",
          error: err.toString()
        });
      });
  }

  render() {
    const { todosByUser, state, error } = this.state;
    const users = keys(todosByUser);
    return (
      <Router>
        {{
          loading: <h1>Loading Todos</h1>,
          success: (
            <Fragment>
              <Route path="/" render={props => <Users users={users} />} />
              <Route
                path="/users/:userId"
                render={props => (
                  <User
                    userId={getUserIdFromMatch(props)}
                    todos={getUserTodos(todosByUser)(props)}
                  />
                )}
              />
            </Fragment>
          ),
          error: <h1>There was an error: {error}</h1>
        }[state]}
      </Router>
    );
  }
}
export default App;

import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import {
  getTodos,
  todosByUser,
  getUserTodos,
  getUserIdFromMatch,
  createTodo,
  todoFactory
} from "./modules/todos";
import { keys } from "ramda";
import "./App.css";

class App extends Component {
  state = {
    todos: [],
    state: "loading", // success, error
    error: ""
  };

  componentDidMount() {
    this.setState({ state: "loading" });
    getTodos()
      .then(({ data: todos }) => {
        this.setState({ state: "success", todos });
      })
      .catch(err => {
        this.setState({
          state: "error",
          error: err.toString()
        });
      });
  }

  createTodo = (userId, title) => {
    createTodo(userId, title).then(({ data }) => {
      this.setState(state => ({
        todos: [
          todoFactory({ id: data.id, userId, title }),
          ...state.todos,
        ]
      }));
    });
  };

  render() {
    const { todos, state, error } = this.state;
    const byUser = todosByUser(todos);
    const users = keys(byUser);
    return (
      <Router>
        {
          {
            loading: <h1>Loading Todos</h1>,
            success: (
              <Fragment>
                <Route path="/" render={props => <Users users={users} />} />
                <Route
                  path="/users/:userId"
                  render={props => (
                    <User
                      userId={getUserIdFromMatch(props)}
                      todos={getUserTodos(byUser)(props)}
                      createTodo={this.createTodo}
                    />
                  )}
                />
              </Fragment>
            ),
            error: <h1>There was an error: {error}</h1>
          }[state]
        }
      </Router>
    );
  }
}
export default App;

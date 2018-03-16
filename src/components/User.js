import React from "react";
import P from "prop-types";
import TodoHeader from "./TodoHeader";
import TodoList from './TodoList';

export default function User({ userId, todos, createTodo }) {
  return (
    <div>
      <h2>User {userId}</h2>
      <TodoHeader onAddTodo={createTodo} userId={userId} />
      <TodoList list={todos} />
    </div>
  );
}

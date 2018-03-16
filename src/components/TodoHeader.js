import React from "react";

export default function TodoHeader({ onAddTodo, userId }) {
  var input = {};
  return (
    <header className="header">
      <form onSubmit={addTodo} action="">
        <input
          ref={ref => (input = ref)}
          name="todoInput"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );

  function addTodo(e) {
    var value = input.value;
    onAddTodo(userId, value);
    input.value = "";
    e.preventDefault();
  }
}

import React from "react";
import P from "prop-types";

export default function Todo(
  {
    title,
    completed,
    toggleTodoDone,
    deleteTodo
  }
) {
  return (
    <div className={`${completed ? "completed" : ""}`}>
      <div className="view">
        <input
          checked={completed}
          onChange={toggleTodoDone}
          className="toggle"
          type="checkbox"
        />
        <label>{title}</label>
        <button onClick={deleteTodo} className="destroy" />
      </div>
      <input className="edit" defaultValue="Create a TodoMVC template" />
    </div>
  );
}

Todo.displayName = "Todo";

Todo.propTypes = {
  title: P.string.isRequired,
  completed: P.bool.isRequired,
  toggleTodoDone: P.func.isRequired,
  deleteTodo: P.func.isRequired
};

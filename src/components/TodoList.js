import React from "react";
import P from "prop-types";
import Todo from "./Todo";

export default function TodoList({ list, toggleTodoDone, deleteTodo }) {
  return <ul className="todo-list">{renderList(list)}</ul>;

  function renderList(list) {
    return list.map((todo, idx) => (
      <li key={todo.id}>
        <Todo
          deleteTodo={function() {
            deleteTodo(idx);
          }}
          toggleTodoDone={function() {
            toggleTodoDone(idx);
          }}
          title={todo.title}
          completed={todo.completed}
        />
      </li>
    ));
  }
}

TodoList.displayName = "TodoList";

TodoList.propTypes = {
  list: P.array.isRequired,
  toggleTodoDone: P.func.isRequired,
  deleteTodo: P.func.isRequired
};

TodoList.defaultProps = {
  list: [],
  deleteTodo: () => {},
  toggleTodoDone: () => {}
};

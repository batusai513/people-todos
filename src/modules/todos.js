import { compose, prop, groupBy, values, map, path, flip } from "ramda";
import { get, post } from "../libs/http";

export function getTodos() {
  return get("todos", {});
}

export function createTodo(userId, title) {
  return post("todos", {
    body: {
      userId,
      title,
      completed: false
    }
  });
}

export const todosByUser = compose(map(values), groupBy(prop("userId")));

export const getUserIdFromMatch = path(["match", "params", "userId"]);

export const getUserTodos = users =>
  compose(flip(prop)(users), getUserIdFromMatch);

export function todoFactory(props) {
  return Object.assign({}, { completed: false }, props);
}

function inspect(item) {
  console.warn(item);
  return item;
}

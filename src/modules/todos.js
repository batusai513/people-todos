import { compose, prop, groupBy, values, map, path, flip } from 'ramda';
import { get } from '../libs/http';

export function getTodos() {
  return get('todos', {});
}

export const todosByUser = compose( map(values), groupBy(prop('userId')) );

export const getUserIdFromMatch = path(['match', 'params', 'userId']);

export const getUserTodos = (users) => compose(flip(prop)(users), getUserIdFromMatch);

function inspect(item) {
  console.warn(item);
  return item;
}
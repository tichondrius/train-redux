export const getVisibleTodos = (todos, filter) => {
  switch(filter)
  {
    case 'SHOW_ALL': 
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(h => h.completed === false);
    case 'SHOW_COMPLETED':
      return todos.filter(h => h.completed === true);
    default: return todos;
  }
}
let nextId = 0;
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: nextId++,
    text
});

export const setFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const toogleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});
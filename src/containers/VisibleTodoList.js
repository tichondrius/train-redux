import { connect } from 'react-redux';
import React from 'react';
import Todo from '../components/Todo';
import { toogleTodo } from '../actions'

const TodoList = ({
  toogleTodo,
  todos 
}) => (
  <ul>
    {todos.map(todo => <Todo
        key={todo.id}
        {...todo}
        onClick={() => {toogleTodo(todo.id)}} />)}
  </ul>
);

const getVisibieTodos = (todos, filter) => {
  console.log(filter);
  switch (filter) {
    case 'SHOW_ALL' :
      return todos;
    case 'SHOW_COMPLETED' :
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}

const mapStateToProps = (state) => ({
    todos: getVisibieTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => ({
    toogleTodo(id){ 
      dispatch(toogleTodo(id)) 
    }
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps)
(TodoList);

export default VisibleTodoList;
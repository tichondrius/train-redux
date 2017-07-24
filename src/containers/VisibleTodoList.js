import { connect } from 'react-redux';
import React from 'react';
import Todo from '../components/Todo';
import { toogleTodo } from '../actions';
import { withRouter } from 'react-router';


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
    case 'all' :
      return todos;
    case 'completed' :
      return todos.filter(t => t.completed)
    case 'active':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}

const mapStateToProps = (state, ownProps) => ({
    todos: getVisibieTodos(
      state.todos, ownProps.params.filter || 'all'
    ),
})

const mapDispatchToProps = (dispatch) => ({
    toogleTodo(id){ 
      dispatch(toogleTodo(id)) 
    }
})

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)
(TodoList));

export default VisibleTodoList;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import  { createStore, combineReducers } from 'redux'
import { Provider , connect}  from 'react-redux';

const todo = (state, action) => {
  switch(action.type){
    case 'ADD_TODO':
      return {
        id:action.id,
        text: action.text,
        completed: false
      };
    case  'TOGGLE_TODO':
      return state.id == action.id ? {...state, completed: !state.completed}: state;

  }
}
const todos = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(h => todo(h, action));
    default: return state;
  }
}
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const getVisibleTodos = (todos, filter) => {
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
const Link  = ({active, children, onClick}) => {
  if (active){
    return <span>{children}</span>
  }
  return (
    <a href='#'
       onClick={e => {
         e.preventDefault();
         onClick(); 
       }}
       >
       {children}
       </a>
  );
}



class FilterLink extends React.Component{
  componentDidMount(){
    const {store} = this.context;
    const state = store.getState();
    this.unsubcribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount(){
    this.unsubcribe();
  }
  render(){
    const props = this.props;
    const {store} = this.context;
    const state = store.getState();
    return (
      <Link active={
        props.filter == state.visibilityFilter
      }
          onClick={() => {
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: props.filter
            });
          }}>
          {props.children}
      </Link>
    );
  }
}
FilterLink.contextTypes = {
  store: React.PropTypes.object
}



const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
      style={{
        textDecoration: completed ?
        'line-through' :
        'none'
      }}
      onClick={onClick}>
      {text}
  </li>
);
const TodoList = ({
  onTodoClick,
  todos 
}) => (
  <ul>
    {todos.map(todo => <Todo
        key={todo.id}
        {...todo}
        onClick={() => {onTodoClick(todo.id)}} />)}
  </ul>
);

const VisibleTodoList = (props) => (
  <TodoList
        todos = {
          props.todos
        }
        onTodoClick={props.toogleTodo}
        />
);
  

const mapStateToProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => ({
    toogleTodo : (id) => dispatch({
      type: 'TOGGLE_TODO',
      id
    })
})

const Body = connect(
  mapStateToProps,
  mapDispatchToProps)
(VisibleTodoList);


const AddTodo = (props) => (
   <div>
         <input ref={node => {this.input = node}} type="text"></input>
            <button onClick={() => {
                console.log(typeof(props.addTodo));
                props.addTodo(this.input.value);
              }}>
                Add todo
            </button>
    </div>
);
    

const mapStateToAddTodoProps = (state) => ({

});
const mapDispatchToAddTodoProps = (dispatch) => ({
    addTodo : (text) => dispatch({
      id: nextId++,
      type: 'ADD_TODO',
      text
    })
})

const Add = connect(
  mapStateToAddTodoProps,
  mapDispatchToAddTodoProps
)(AddTodo);



const Footer = () => (
  <p>
      Show:
      {' '}
      <FilterLink 
        filter='SHOW_ALL'>
        All
      </FilterLink>
        {' '}
        <FilterLink 
           
          filter='SHOW_ACTIVE'>
        Active
      </FilterLink >
        {' '}
        <FilterLink 
          filter='SHOW_COMPLETED'>
        Completed
      </FilterLink>
  </p>
);
const TodoApp = ({todos, visibilityFilter}) => (
        <div>
            <Add/>
            <Body/>
            <Footer/>
        </div>
    );


const rootReducer = combineReducers({
  todos,
  visibilityFilter
}) 


  ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
      <TodoApp/>
    </Provider>
  , document.getElementById('root'));


registerServiceWorker();

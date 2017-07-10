import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import  {createStore, combineReducers} from 'redux'

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
      break;
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

const rootReducer = combineReducers({
  todos,
  visibilityFilter
}) 



const store = createStore(rootReducer);
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
    this.unsubcribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount(){
    this.unsubcribe();
  }
  render(){
    const props = this.props;
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

const AddTodo = ({
  onAddClick
}) => {
  let input;
  return (
    <div>
         <input ref={node => {input = node}} type="text"></input>
            <button onClick={() => {onAddClick(input.value)}}>
                Add todo
            </button>
    </div>
)}

const FooterLink = () => (
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
            <AddTodo
              onAddClick={(value)=> {
                store.dispatch({
                  type: 'ADD_TODO',
                  id: nextId++,
                  text: value
                })
              }}
            />
            <TodoList 
              todos={getVisibleTodos(todos, visibilityFilter)} 
              onTodoClick={(id) => {
                console.log(id);
                store.dispatch({
                 type: 'TOGGLE_TODO',
                 id
              })}}/>
            <FooterLink onFilterClick={filter => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter
              })
            }}/>
        </div>
    );

const render = () => {
  ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'));
}
store.subscribe(() => {
  render();
});

render();









registerServiceWorker();


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

export default todos;
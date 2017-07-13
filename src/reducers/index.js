import {combineReducers} from 'redux';
import todos from './Todo';
import visibilityFilter from './Filter';

const rootReducer = combineReducers({
  todos,
  visibilityFilter
}) 

export default rootReducer;
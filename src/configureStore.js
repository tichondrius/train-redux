import { createStore } from 'redux';

import rootReducer from './reducers';
import { getState, setState } from './localStorage'




export default function configureStore() {
    let persistState = getState();
    if (persistState == undefined){
        return store;
    }
    let store =  createStore(rootReducer, {todos: persistState.todos});
    store.subscribe(()=>{
        setState(store.getState());
    })
    return store;
}






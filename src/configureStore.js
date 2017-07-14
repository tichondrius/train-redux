import { createStore } from 'redux';

import rootReducer from './reducers';
import { getState, setState } from './localStorage'


export default function configureStore() {
    let persistState = getState();
    let store;
    if (persistState === undefined){
        store =  createStore(rootReducer);
    }
    else store =  createStore(rootReducer, {todos: persistState.todos});
    store.subscribe(()=>{
        setState(store.getState());
    })
    return store;
}






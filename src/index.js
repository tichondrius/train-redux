import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Provider }  from 'react-redux';
import configureStore from './configureStore';
import TodoApp from './components/TodoApp';


const store = configureStore();


  ReactDOM.render(
    <Provider store={configureStore()}>
      <TodoApp/>
    </Provider>
  , document.getElementById('root'));


registerServiceWorker();

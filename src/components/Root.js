import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from './TodoApp';
import configureStore from '../configureStore';
import {Router, Route, browserHistory} from 'react-router'


const Root = ({ store }) => (
  <Provider store={ store }>
      <Router history={browserHistory}>
        <Route path="/(:filter)" component={TodoApp} />
      </Router>
  </Provider>
);

export default Root;
import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router'
import App from './App';
import Login from './component/login';
import Signup from './component/signup';
import New from './component/new';
const e = document.createElement('div');
e.id = 'app';
document.body.appendChild(e);

const EventEmitter = require('events');
window.emitter = new EventEmitter;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/new" component={New}></Route>
    </Route>
  </Router>
), e);

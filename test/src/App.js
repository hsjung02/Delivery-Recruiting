import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import Home from './routes/Home.js';
import Join from './routes/Join.js';
import Login from './routes/Login.js';
import Logout from './routes/Logout.js';
import Mypage from './routes/Mypage.js';
import Neworder from './routes/Neworder.js';
import Order from './routes/Order.js';

function App(){
    return (
      <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/join">
            <Join></Join>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path='/logout'>
            <Logout></Logout>
          </Route>
          <Route exact path='/mypage'>
            <Mypage></Mypage>
          </Route>
          <Route exact path='/neworder'>
            <Neworder></Neworder>
          </Route>
          <Route path='/order'>
            <Order></Order>
          </Route>
        </Switch>
      </div>
    </Router>
    );
}

export default App;
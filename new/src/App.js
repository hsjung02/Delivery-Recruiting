import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import {useCookies} from 'react-cookie';

import Userheader from './routes/Userheader.js';
import Notheader from './routes/Notheader.js';

import Home from './routes/Home.js';
import Join from './routes/Join.js';
import Login from './routes/Login.js';
import Logout from './routes/Logout.js';
import Mypage from './routes/Mypage.js';
import Neworder from './routes/Neworder.js';
import Order from './routes/Order.js';

function App() {

  const [logined, setLogined] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['tel']);

  const login = (tel) => {setCookie('tel',tel); setLogined(true);}

  return (
    <Router>
      <div className='html'>
          <div className='body'>
            <div className='container'>
              <div className='header' onClick={(e)=>{window.location.href='/'}}>포스텍 배달팟 모으기</div>
              <div className='midbox'>
              {logined ? <Userheader/> : <Notheader/>}
        <Switch>
          <Route exact path='/'>
            <Home t={cookies.tel}></Home>
          </Route>
          <Route exact path='/join'>
            <Join></Join>
          </Route>
          <Route exact path='/login'>
            <Login login={login}></Login>
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
          <Route exact path='/order/:ordername'>
            <Order></Order>
          </Route>
        </Switch>
        </div>
        <div className='footer'>COPYRIGHT hsjung02. ALL RIGHTS RESERVED.</div>
            </div>
          </div>
        </div>
    </Router>
  );
}

export default App;

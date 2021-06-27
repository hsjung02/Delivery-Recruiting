import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import './App.css';
import axios from 'axios';

import Join from './routes/Join.js'

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
        </Switch>
      </div>
    </Router>
    );
}
class Home extends Component{

  constructor(){
    super();
    this.state={
    logined:false,
    order:[]
    };

    fetch('/',{
      method:"GET",
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json"
        },
      }).then(res=>console.log(res.logined));
  }

  



  render(){
    var logined=this.state.logined;
    var order=this.state.order;

    return(
      <div className='html'>
        <div className='body'>
          <div className='container'>
            <div className='header' onClick={(e)=>{window.location.href='/'}}>포스텍 배달팟 모으기</div>
            <div className='midbox'>
            {logined ? <Userheader/> : <Notheader/>}
              <board>
                <div className='title'>주문 목록</div>
                <div className='orderbox'>
                  {order.map((ord,index)=>(
                    <ul><input type='submit' value={ord} onClick={(e)=>{window.location.href='/order/'+ord}}/></ul>
                  ))}
                </div>
              </board>
            </div>
            <div className='footer'>COPYRIGHT hsjung02. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </div>
    );
  }
}

class Userheader extends Component{
  render(){
    return(
      <menu>
      <h2>MENU</h2>
      <div className='menu' onClick={(e)=>{window.location.href='/'}}>모집중인 주문</div>
      <div className='menu' onClick={(e)=>{window.location.href='/neworder'}}>새 주문 만들기</div>
      <div className='menu' onClick={(e)=>{window.location.href='/mypage'}}>마이페이지</div>
      <div className='menu' onClick={(e)=>{window.location.href='/logout'}}>로그아웃</div>
    </menu>
  )
  }
  
}

class Notheader extends Component{
  render(){
    return(
      <menu>
      <h2>MENU</h2>
      <div className='menu' onClick={(e)=>{window.location.href='/'}}>모집중인 주문</div>
      <div className='menu' onClick={(e)=>{window.location.href='/login'}}>로그인</div>
      <div className='menu' onClick={(e)=>{window.location.href='/join'}}>회원가입</div>
    </menu>
  )
  }
}








class Login extends Component{

}


export default App;
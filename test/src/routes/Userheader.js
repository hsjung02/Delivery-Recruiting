import React from 'react';

function Userheader(){
      return(
        <menu>
        <h2>MENU</h2>
        <div className='menu' onClick={(e)=>{window.location.href='/home'}}>모집중인 주문</div>
        <div className='menu' onClick={(e)=>{window.location.href='/neworder'}}>새 주문 만들기</div>
        <div className='menu' onClick={(e)=>{window.location.href='/mypage'}}>마이페이지</div>
        <div className='menu' onClick={(e)=>{window.location.href='/logout'}}>로그아웃</div>
      </menu>
    );
    
  }

  export default Userheader
  
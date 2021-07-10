function Notheader(){
  return(
    <menu>
    <h2>MENU</h2>
    <div className='menu' onClick={(e)=>{window.location.href='/'}}>모집중인 주문</div>
    <div className='menu' onClick={(e)=>{window.location.href='/login'}}>로그인</div>
    <div className='menu' onClick={(e)=>{window.location.href='/join'}}>회원가입</div>
  </menu>
);
}


export default Notheader
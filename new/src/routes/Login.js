import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Login({login}){

  const [t,setTel] = useState('');
  const [p,setPw] = useState('');
  const [check, setCheck] = useState(null);
  
  const handleChangetel=(e)=>{
    setTel(e.target.value);
  }

  const handleChangepw=(e)=>{
    setPw(e.target.value);
  }

  const submitJoin = (e) => {
    checkJoin();
  }

  const checkJoin = async() =>{
    const response = await axios.post('http://localhost:3001/login',{tel:t,pw:p},{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }});
    console.log(response.data.loginsuccess);
    if(response.data.loginsuccess==true){login(t);}
    window.location.href='/';
  }


  return(
            <board>
              <div class='title'>로그인</div>
              <div class='loginform'>
                <form>
                  <input placeholder='ID(TEL)' value={t} onChange={handleChangetel}/>
                </form>
                <form>
                  <input placeholder='PW' value={p} onChange={handleChangepw}/>
                </form>
                <button onClick={submitJoin}>로그인</button>
              </div>
            </board>

    );

}





export default Login;
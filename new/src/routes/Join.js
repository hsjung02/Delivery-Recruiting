import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Join(){

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
    console.log(e.tel,e.pw);
    checkJoin(e.tel,e.pw);
  }

  const checkJoin = async() =>{
    const response = await axios.post('http://localhost:3001/join',{tel:t,pw:p},{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }});
    setCheck(response.data.check);
    window.location.href='/';
  }


  return(
            <board>
              <div class='title'>회원가입</div>
              <div class='loginform'>
                <form>
                  <input placeholder='ID(TEL)' value={t} onChange={handleChangetel}/>
                </form>
                <form>
                  <input placeholder='PW' value={p} onChange={handleChangepw}/>
                </form>
                <button onClick={submitJoin}>회원가입</button>
              </div>
            </board>

    );

}





export default Join;
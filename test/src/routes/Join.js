import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Join(){

    const [tel, setTel] = useState('');
    const [pw, setPw] = useState('');

  
    const handleChangetel=(e)=>{
      setTel(e.target.value);
    }
  
    const handleChangepw=(e)=>{
      setPw(e.target.value);
    }
  
    const tryJoin = async() => {
      var check=false;
      const response = await axios.post('http://localhost:3001/join',{tel:tel, pw:pw})
      console.log(response )
    }
  
      return(
        <div className='App'>
          <div className='App-header'>
            <form>
              <input placeholder='ID(TEL)' value={tel} onChange={handleChangetel}/>
            </form>
            <form>
              <input placeholder='PW' value={pw} onChange={handleChangepw}/>
            </form>
            <button onClick={tryJoin}>회원가입</button>
          </div>
          
        </div>
      );
  
  }

  export default Join;
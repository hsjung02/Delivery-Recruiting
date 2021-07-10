import React, {useState, useEffect} from 'react';
import Userheader from './Userheader.js';
import Notheader from './Notheader.js';
import axios from 'axios';


function Home(){

    const [logined, setLogined] = useState(false);
    const [order,setOrder] = useState(['HELLO','BYE']);

    const fetchOrders = async() => {
      const response = await axios.get('http://localhost:3001');
      console.log(response);
      // setOrder(response.data);
      console.log(order);
    }

    useEffect(()=>{fetchOrders();},[]);

  
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
  

  export default Home;
import {useState, useEffect} from 'react';
import axios from 'axios';

function Home({t}){

    const [logined, setLogined] = useState(false);
    const [tel,setTel] = useState('');
    const [order, setOrder] = useState(['HELLO','BYE']);

    const fetchOrders = async() =>{
        const response = await axios.get('http://localhost:3001');
        setLogined(response.data.logined);
        setOrder(response.data.order);

    }

    useEffect(()=>{fetchOrders();},[]);

    return(
        
                <board>
                  <div className='title'>hi {t}</div>
                  <div className='title'>주문 목록</div>
                  <div className='orderbox'>
                    {order.map((ord,index)=>(
                      <ul><input type='submit' value={ord} onClick={(e)=>{window.location.href='/order/'+ord}}/></ul>
                    ))}
                  </div>
                </board>
    );
}

export default Home;
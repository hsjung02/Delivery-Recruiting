import './orders.css'
import {Component} from "react";
import {Message} from "semantic-ui-react";
import axios from "axios";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state={
      OrderList: []
    }
  }

  getData=async()=>{
    const res = await axios.get("http://localhost:3001/")
    this.setState({
      OrderList: res.data.OrderList
    })
  }

  componentDidMount() {
    this.getData()
  }


  render(){
    const myList = this.state.OrderList
    return(
        <div className="order">
          {myList.map(item=>{
            return(
                <a href={`http://localhost:3001/Order/${item}`}>
                  <Message>
                    주문명 : {item}<br/>
                  </Message>
                </a>
            )
          })}
        </div>
    );
  }
}

export default Orders;

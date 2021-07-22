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
    const res = await axios.get("/")
    console.log(res)
    this.setState({
      OrderList: res.data
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
                <Message>
                  주문명 : {item}<br/>
                </Message>
            )
          })}
        </div>
    );
  }
}

export default Orders;

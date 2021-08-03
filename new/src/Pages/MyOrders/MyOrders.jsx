import './myorders.css'
import {Component} from "react";
import {Message} from "semantic-ui-react";
import axios from "axios";

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state={
      myOrderList: [],
      orderList: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData=async()=>{
    const res = await axios.get("/mypage")
    this.setState({
      myOrderList: res.myorderlist,
      orderList: res.orderlist
    })
  }

  render(){
    const myList = this.state.myOrderList
    const List = this.state.orderList
    return(
        <div className="my-order">
          <p>
            내가 만든 주문
          </p>
          {myList.map(item=>{
            return(
                <Message>
                  주문명 : {item}<br/>
                  <br/>
                </Message>
            )
          })}
          <p>
            내가 참여한 주문
          </p>
          {List.map(item=>{
            return(
                <Message>
                  주문명 : {item}<br/>
                  <br/>
                </Message>
            )
          })}
        </div>
    );
  }
}

export default MyOrders;

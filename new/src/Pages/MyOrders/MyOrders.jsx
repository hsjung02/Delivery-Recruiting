import './myorders.css'
import {Component} from "react";
import {Divider, Message} from "semantic-ui-react";
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
          <Divider/>
          <p>
            내가 만든 주문<br/>
          </p>
          <Divider/>
          {myList.map(item=>{
            return(
                <Message>
                  주문명 : {item}<br/>
                  <br/>
                </Message>
            )
          })}
          <Divider/>
          <p>
            내가 참여한 주문<br/>
          </p>
          <Divider/>
          {List.map(item=>{
            return(
                <Message>
                  주문명 : {item}<br/>
                  <br/>
                </Message>
            )
          })}
          <Divider/>
        </div>
    );
  }
}

export default MyOrders;

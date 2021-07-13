import './orders.css'
import {Component} from "react";
import {Message} from "semantic-ui-react";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state={
      OrderList: [{shop: "훈이네", due:"2021년 7월 1일 12시 00분", num: 2, Max: 8 }] //추후 api로 받아들일 예정
    }
  }

  render(){
    const myList = this.state.OrderList
    return(
        <div className="order">
          {myList.map(item=>{
            return(
                <Message>
                  <Message.Header>{item.shop}</Message.Header>
                  주문 마감: {item.due}<br/>
                  참여 인원: {item.num}/{item.Max}<br/>
                </Message>
            )
          })}
        </div>
    );
  }
}

export default Orders;

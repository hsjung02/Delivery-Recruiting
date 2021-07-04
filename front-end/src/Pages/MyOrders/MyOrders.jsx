import './myorders.css'
import {Component} from "react";
import {Message} from "semantic-ui-react";

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state={
      myOrderList: [{amIMade: true, shop: "훈이네", menu:["닭갈비볶음밥","목살필라프"],price: 15000, day:"2021년 7월 1일 12시 00분", isFinished: false},
        {amIMade: false, shop: "새천년", menu:["메뉴 뭐있었는지 까먹었어요...."],price: 8000, day:"2021년 6월 28일 11시 30분", isFinished: true}]
      //추후 api로 받아들일 예정
    }
  }

  render(){
    const myList = this.state.myOrderList
    return(
        <div className="my-order">
          {myList.map(item=>{
            return(
                <Message>
                  <Message.Header>{item.amIMade? "(내가만든 주문)":""}{item.day}</Message.Header>
                  주문 가게: {item.shop}<br/>
                  주문 메뉴: {item.menu.map((dish,index)=>{
                    if(dish.length===index){
                      return(dish)
                    }
                    else{
                      return(dish+", ")
                    }
                })}<br/>
                  가격: {item.price}<br/>
                  {item.isFinished? "진행중":"종료된 주문" }
                </Message>
            )
          })}
        </div>
    );
  }
}

export default MyOrders;

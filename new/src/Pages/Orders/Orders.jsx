import './orders.css'
import {Component} from "react";
import {Message} from "semantic-ui-react";
import axios from "axios";
import Order from "../Order/Order";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state={
      selected: false,
      OrderList: [],
      title: ""
    }
  }

  getData=async()=>{
    const res = await axios.get("http://localhost:3001/", {withCredentials: true})
    this.setState({
      OrderList: res.data.order
    })
  }

  componentDidMount() {
    this.getData()
  }

  setTitle=(title)=>{
    this.setState({
      title: title,
      selected: true
    })
  }


  render(){
    const myList = this.state.OrderList
    if(this.state.selected===false){
      return(
          <div className="order">
            {myList.map(item=>{
              return(
                  <Message onClick={this.setTitle(item)}>
                    주문명 : {item}<br/>
                  </Message>
              )
            })}
          </div>
      );
    }
    else if(this.state.selected===true){
      return(
          <Order title={this.state.title}/>
      )
    }

  }
}

export default Orders;

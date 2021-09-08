import {Component} from "react";
import axios from "axios";
import {Button, Message} from "semantic-ui-react";


class EndOrder extends Component{
    constructor(props) {
        super(props);
        this.ordername = this.props.match.name
        this.endUrl="http://localhost:3001/order/end/"+this.ordername
        this.state= {
            totalPrice: "",
            partyData: []
        }
    }


    componentDidMount() {
        this.getData()
    }

    getData=async()=>{
        const res = await axios.get(this.endUrl)
        this.setState({
            totalPrice: res.totalprice,
            partyData: res.orders
        })
    }

    endRecruit=async()=> {
        await axios.post(this.endUrl)
        window.location.href = "/"
    }

    render(){

        return(
            <div>
                최소 주문 금액: {this.state.totalPrice}<br/>
                {this.state.partyData.map(item=>{
                return(
                <Message>
                    주문자 전화번호 : {item.tel}<br/>
                    주문한 음식 : {item.product}<br/>
                    주문한 가격 : {item.price}<br/>
                </Message>
                )
            })}
                <Button onClick={this.endRecruit()}>
                    모집 마감
                </Button>
            </div>

        )
    }


}


export default EndOrder
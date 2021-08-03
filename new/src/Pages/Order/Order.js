import {Component} from "react";
import {Button, Message} from "semantic-ui-react";
import axios from "axios";

class Order extends Component{
    constructor(props) {
        super(props);
        this.orderName = this.props.match.name
    }

    getOrderData=async()=>{
        const title = "http://localhost:3001/order/" + this.orderName
        const orderData_ = await axios.get(title)
        this.setState({
            orderData: orderData_
        })
    }

    componentDidMount() {
        this.getOrderData()
    }


    finRecruit = async() => {
        const NewUrl = "http://localhost:3001/order/end/"+this.orderName
        await axios.post(NewUrl)
        window.location.href = "/"
    }



    render(){
        const login = this.state.orderData.loginsuccess
        const totalPrice = this.state.orderData.totalprice
        const minPrice = this.state.orderData.min_price
        const host = this.state.orderData.host

        if(login===0){
            return(
                <Message
                    style={{
                        width: "70%",
                        margin: "100px auto"
                    }}
                >
                    로그인이 필요한 서비스입니다.<br/>
                    <Button
                        style={{
                            width: "150px",
                            margin: "auto"
                        }}
                        onClick={window.location.href="/Login"}
                        >
                        확인
                    </Button>
                </Message>
            );
        }
        else{
            if(host===1){
                return(
                    <Message
                        style={{

                        }}
                        >최소 주문 금액: {minPrice}원 <br/>
                        총 금액: {totalPrice}원 <br/>
                        <Button
                            style={{
                                margin: "auto",
                                width: "200px"
                            }}
                        onClick={this.finRecruit()}>
                            주문 마감
                        </Button>
                    </Message>
                )
            }
            else{
                return(
                    <Message
                        style={{

                        }}
                    >최소 주문 금액: {minPrice}원 <br/>
                        모인 금액: {totalPrice}원 <br/>
                        <Button
                            onClick={window.location.href = "/AddPerson"+this.orderName}
                            >
                            Join Party
                        </Button>
                    </Message>
                )
            }
        }
    }
}

export default Order
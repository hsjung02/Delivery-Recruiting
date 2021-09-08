import {Component} from "react";
import {Button, Form,  Message} from "semantic-ui-react";
import axios from "axios";


class AddPerson extends Component{
    constructor(props) {
        super(props);
        this.ordername = this.props.match.name
        this.orderUrl = "http://localhost:3001/order/"+this.ordername
        this.state={
            productName: "",
            productPrice: "",
            orderData: {}
        }
    }

    updateName=(e)=>{
        this.setState({
            productName: e.target.value
        })
    }

    updatePrice=(e)=>{
        this.setState({
            productPrice: e.target.value
        })
    }

    componentDidMount() {
        this.getData()
    }

    getData=async()=>{
        const res = await axios.get(this.orderUrl)
        this.setState({
            orderData: res
        })
    }

    sendData=async()=>{
        await axios.post(this.orderUrl, {
            product: this.state.productName,
            price: this.state.productPrice
        })
    }


    render(){
        return(
            <Message>
                진행사항<br/>
                최소 주문 금액: {this.state.orderData.min_price}<br/>
                현재 모인 금액: {this.state.orderData.totalprice}<br/>

                <Form
                    style={{
                    width: '70%',
                    margin: '50px auto'
                }}>

                    <Form.Field>
                        <label style={{color: 'white'}}>주문할 음식</label>
                        <input placeholder='주문할 음식을 적어주세요'
                               value={this.state.productName}
                               onChange={this.updateName}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{color: 'white'}}>주문가격</label>
                        <input placeholder='주문하려는 상품의 가격을 알려주세요'
                               value={this.state.productPrice}
                               onChange={this.updatePrice}
                        />
                    </Form.Field>
                    <Button
                        onClick={this.sendData}
                    >Submit</Button>
                </Form>
            </Message>
        )
    }
}


export default AddPerson


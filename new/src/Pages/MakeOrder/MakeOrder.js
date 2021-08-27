import './makeorder.css'
import {Component} from "react";
import {Button, Form} from "semantic-ui-react";
import axios from "axios";

class MakeOrder extends Component{
    constructor(props) {
        super(props);
        this.state={
            name: "",
            totalprice: "",
            product: "",
            price: ""
        }
    }

    updateName=(e)=>{
        this.setState({
            name: e.target.value
        })
    }

    updateTotalPrice=(e)=>{
        this.setState({
            totalprice: e.target.value
        })
    }

    updateProduct=(e)=>{
        this.setState({
            product: e.target.value
        })
    }

    updatePrice=(e)=>{
        this.setState({
            price: e.target.value
        })
    }

    sendData=async()=>{
        await axios.post("http://localhost:3001/neworder",
            {
                name: this.state.name,
                totalprice: this.state.totalprice,
                product: this.state.product,
                price: this.state.price
            },
            {withCredentials: true}
            )
        window.location.href = `/order/${this.state.name}`

    }


    render(){
        return(
            <Form style={{
                width: '70%',
                margin: '50px auto'
            }}>
                <Form.Field>
                    <label style={{color: 'white'}}>생성 주문 이름</label>
                    <input placeholder='주문할 가게명 등으로 주문이름을 만들어주세요'
                           value={this.state.name}
                           onChange={this.updateName}
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>최소 주문가격</label>
                    <input placeholder='배달 하는데 필요한 최소 가격'
                           value={this.state.totalprice}
                           onChange={this.updateTotalPrice}
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>주문 메뉴</label>
                    <input placeholder='주문할 메뉴'
                           value={this.state.product}
                           onChange={this.updateProduct}
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>가격</label>
                    <input placeholder='주문할 메뉴의 가격'
                           value={this.state.price}
                           onChange={this.updatePrice}
                    />
                </Form.Field>
                <Button
                    onClick={this.sendData}
                >Submit</Button>
            </Form>
        )
    }

}

export default MakeOrder
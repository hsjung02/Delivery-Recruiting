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
            price: "",
            tag: "",
            tags: []
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

    updateTag=(e)=>{
        this.setState({
            tag:e.target.value
        })
    }

    addTags=(e)=>{
        this.setState({
            tags: this.state.tags.concat(this.state.tag)
        })
        this.setState({
            tag:""
        })
    }

    sendData=async()=>{
        await axios.post("http://localhost:3001/neworder",
            {
                name: this.state.name+'_'+this.DateToString(),
                totalprice: this.state.totalprice,
                product: this.state.product,
                price: this.state.price,
                tags: this.state.tags
            },
            {withCredentials: true}
            )
        window.location.href = `/order/${this.state.name}`

    }

    makeTwo=(num)=>{
        if(num<10){
            return '0'+ num
        }
        else{
            return num
        }
    }

    DateToString=()=>{
        const date = new Date;
        return date.getFullYear() + this.makeTwo(date.getMonth()+1) + this.makeTwo(date.getDay()) + this.makeTwo(date.getHours()) + this.makeTwo(date.getMinutes()) + this.makeTwo(date.getSeconds())
    }

    render(){
        var tag_query = "";
        for(var tag of this.state.tags){
            tag_query+=tag;
            tag_query+= ',';
        }
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
                <Form.Field>
                    <label style={{color: 'white'}}>태그</label>
                    <input placeholder='추가하고 싶은 태그를 입력하세요'
                           value={this.state.tag}
                           onChange={this.updateTag}
                    />
                    <label style={{color: 'white'}}>현재 태그: {tag_query}</label>
                    <Button onClick={this.addTags}
                    >태그 추가</Button>
                </Form.Field>
                <Button
                    onClick={this.sendData}
                >Submit</Button>
            </Form>
        )
    }

}

export default MakeOrder
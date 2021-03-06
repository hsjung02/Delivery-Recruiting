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
                    <label style={{color: 'white'}}>?????? ?????? ??????</label>
                    <input placeholder='????????? ????????? ????????? ??????????????? ??????????????????'
                           value={this.state.name}
                           onChange={this.updateName}
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>?????? ????????????</label>
                    <input placeholder='?????? ????????? ????????? ?????? ??????'
                           value={this.state.totalprice}
                           onChange={this.updateTotalPrice}
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>?????? ??????</label>
                    <input placeholder='????????? ??????'
                           value={this.state.product}
                           onChange={this.updateProduct}
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>??????</label>
                    <input placeholder='????????? ????????? ??????'
                           value={this.state.price}
                           onChange={this.updatePrice}
                    />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>??????</label>
                    <input placeholder='???????????? ?????? ????????? ???????????????'
                           value={this.state.tag}
                           onChange={this.updateTag}
                    />
                    <label style={{color: 'white'}}>?????? ??????: {tag_query}</label>
                    <Button onClick={this.addTags}
                    >?????? ??????</Button>
                </Form.Field>
                <Button
                    onClick={this.sendData}
                >Submit</Button>
            </Form>
        )
    }

}

export default MakeOrder
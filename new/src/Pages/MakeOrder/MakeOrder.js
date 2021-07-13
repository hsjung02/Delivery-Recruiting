import './makeorder.css'
import {Component} from "react";
import {Button, Form} from "semantic-ui-react";

class MakeOrder extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Form style={{
                width: '70%',
                margin: '50px auto'
            }}>
                <Form.Field>
                    <label style={{color: 'white'}}>가게명</label>
                    <input placeholder='Store' />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>최대 인원</label>
                    <input placeholder='Maximum' />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>마감 시각</label>
                    <input placeholder='Endtime' />
                </Form.Field>
                <Form.Field>
                    <label style={{color: 'white'}}>연락처</label>
                    <input placeholder='Contact' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )
    }

}

export default MakeOrder
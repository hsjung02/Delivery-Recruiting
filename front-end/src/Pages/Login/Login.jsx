import './login.css'
import {Component} from "react";
import {Button, Form} from "semantic-ui-react";

class Login extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
        <Form style={{
          width: '70%',
          margin: '50px auto'
        }}>
          <Form.Field>
            <label style={{color: 'white'}}>ID</label>
            <input placeholder='id' />
          </Form.Field>
          <Form.Field>
            <label style={{color: 'white'}}>비밀번호</label>
            <input placeholder='password' />
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>
    )
  }

}

export default Login;

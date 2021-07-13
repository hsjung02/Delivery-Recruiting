import './join.css'
import {Button, Form} from "semantic-ui-react";

function Join(props) {
  return(
      <div className="join-form">
          <Form style={{
              width: '70%',
              margin: '50px auto'
          }}>
              <Form.Field>
                  <label style={{color: 'white'}}>이름</label>
                  <input placeholder='Name' />
              </Form.Field>
              <Form.Field>
                  <label style={{color: 'white'}}>ID</label>
                  <input placeholder='id' />
              </Form.Field>
              <Form.Field>
                  <label style={{color: 'white'}}>비밀번호</label>
                  <input placeholder='password' />
              </Form.Field>
              <Form.Field>
                  <label style={{color: 'white'}}>비밀번호 확인</label>
                  <input placeholder='confirm password' />
              </Form.Field>
              <Button type='submit'>Submit</Button>
          </Form>
      </div>
  );
}

export default Join;

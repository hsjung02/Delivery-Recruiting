import "./login.css";
import { useRef } from "react";
import { Button, Form } from "semantic-ui-react";

function Login(props) {
  return (
    <Form
      style={{
        width: "70%",
        margin: "50px auto",
      }}
    >
      <Form.Field>
        <label style={{ color: "white" }}>전화번호</label>
        <input type="tel" placeholder="- 없이 입력하세요" />
      </Form.Field>
      <Form.Field>
        <label style={{ color: "white" }}>비밀번호</label>
        <input type="password" placeholder="password" />
      </Form.Field>
      <Button type="submit">Login</Button>
    </Form>
  );
}

export default Login;

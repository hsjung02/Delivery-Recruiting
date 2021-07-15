import "./login.css";
import { Button, Form } from "semantic-ui-react";
import useLoginInput from "../../hooks/useLoginInput";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../../UserContext/UserContext";

function Login(props) {
  const [telRef, passwordRef, , checkValidity] = useLoginInput();
  const userContext = useContext(UserContext);

  const submitHandler = async e => {
    if (!checkValidity(e)) return;
    const tel = telRef.current.value;
    const pw = passwordRef.current.value;

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        { tel, pw },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      console.log(response.data);

      if (response.data.loginsuccess) {
        alert("로그인에 성공하셨습니다!");
        userContext.logIn(tel);
      } else {
        alert("전화번호와 비밀번호가 맞지 않습니다. 다시 확인하세요.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Form
      style={{
        width: "70%",
        margin: "50px auto",
      }}
    >
      <Form.Field>
        <label style={{ color: "white" }}>전화번호</label>
        <input type="tel" placeholder="- 없이 입력하세요" ref={telRef} />
      </Form.Field>
      <Form.Field>
        <label style={{ color: "white" }}>비밀번호</label>
        <input type="password" placeholder="password" ref={passwordRef} />
      </Form.Field>
      <Button type="submit" onClick={submitHandler}>
        Login
      </Button>
    </Form>
  );
}

export default Login;

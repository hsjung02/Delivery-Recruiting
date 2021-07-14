import "./join.css";
import { Button, Form } from "semantic-ui-react";
import { useRef } from "react";
import axios from "axios";

function Join(props) {
  const telRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  let submittable;

  const telMessage1 = "전화번호를 입력하세요!";
  const telMessage2 = "유효한 전화번호를 입력하세요!";
  const pwMessage1 = "비밀번호를 입력하세요!";
  const pwMessage2 = "비밀번호 확인란은 비밀번호와 같아야 합니다!";

  const notValidAlert = (condition, msg) => {
    if (condition) {
      alert(msg);
      submittable = false;
    }
  };

  const telValidator = args => {
    return /^\d{10,11}/.test(args) && args.length <= 11;
  };

  const postData = async (tel, pw, joinstate) =>
    axios.post(
      "http://localhost:3001/join",
      { tel, pw, joinstate },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  const checkValidity = e => {
    e.preventDefault();

    const tel = telRef.current.value.trim();
    const password = passwordRef.current.value;
    submittable = true;

    notValidAlert(!tel.length, telMessage1);
    notValidAlert(tel.length > 0 && !telValidator(tel), telMessage2);

    notValidAlert(!password.length, pwMessage1);
    notValidAlert(password !== passwordConfirmRef.current.value, pwMessage2);

    return submittable;
  };

  const submitHandler = async e => {
    if (!checkValidity(e)) return;

    try {
      const tel = telRef.current.value;
      const password = passwordRef.current.value;
      let joinstate = 0;

      let response = await postData(tel, password, joinstate);
      if (response.statusText !== "OK") throw new Error("에러가 발생했습니다.");

      const result = response.data.state;
      if (result === 1) {
        alert("회원가입이 완료되었습니다!");
        window.location.href = "/login";
        return;
      }

      joinstate = window.confirm(
        `기존 회원이십니다.\n기존 계정을 삭제하고 새로운 계정을 생성하려면 확인,\n기존 계정의 비밀번호를 확인하려면 취소를 클릭하세요.`
      )
        ? 3
        : 4;

      response = await postData(tel, password, joinstate);

      if (response.statusText !== "OK")
        throw new Error("에러가 발생했습니다! 다시 시도해보세요.");

      if (joinstate === 3) alert("새로운 계정이 생성되었습니다!");
      else alert(`기존 계정의 비밀번호는 ${response.data.pw} 입니다.`);

      window.location.href = "/login";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="join-form">
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
        <Form.Field>
          <label style={{ color: "white" }}>비밀번호 확인</label>
          <input
            type="password"
            placeholder="confirm password"
            ref={passwordConfirmRef}
          />
        </Form.Field>
        <Button type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Join;

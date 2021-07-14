import "./join.css";
import { Button, Form } from "semantic-ui-react";
import { useRef } from "react";

function Join(props) {
  const telRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const telValidator = args => {
    if (/^\d{10, 11}/.test(args)) {
      return true;
    }
    return false;
  };

  const checkValidity = e => {
    e.preventDefault();

    const tel = telRef.current.value.trim();
    const password = passwordRef.current.value;
    let submittable = true;

    if (!tel.length) {
      alert("전화번호를 입력하세요!");
      submittable = false;
    } else if (!telValidator(tel)) {
      alert("유효한 전화번호를 입력하세요!");
      submittable = false;
    }

    if (!password.length) {
      alert("비밀번호를 입력하세요!");
      submittable = false;
    } else if (password !== passwordConfirmRef.current.value) {
      alert("비밀번호 확인란은 비밀번호와 같아야 합니다!");
      submittable = false;
    }

    if (!submittable) return;

    alert("ok!");
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
        <Button type="submit" onClick={checkValidity}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Join;

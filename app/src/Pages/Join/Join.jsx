import "./join.css";
import { Button, Form } from "semantic-ui-react";
import { useState, useContext } from "react";
import axios from "axios";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";
import useLoginInput from "../../hooks/useLoginInput";
import UserContext from "../../UserContext/UserContext";

function Join(props) {
    const [telRef, passwordRef, passwordConfirmRef, checkValidity] =
        useLoginInput();
    const [isLoading, setIsLoading] = useState(false);
    const userContext = useContext(UserContext);

    const postJoinData = async (tel, pw, joinstate) =>
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

    const submitHandler = async e => {
        if (!checkValidity(e)) return;

        try {
            const tel = telRef.current.value;
            const password = passwordRef.current.value;
            let joinstate = 0;

            setIsLoading(true);
            let response = await postJoinData(tel, password, joinstate);
            setIsLoading(false);
            if (response.statusText !== "OK") throw new Error("에러가 발생했습니다.");

            const result = response.data.state;
            if (result === 1) {
                alert("회원가입이 완료되었습니다!");
                userContext.changePage("Login");
                return;
            }

            joinstate = window.confirm(
                `기존 회원이십니다.\n기존 계정을 삭제하고 새로운 계정을 생성하려면 확인,\n기존 계정의 비밀번호를 확인하려면 취소를 클릭하세요.`
            )
                ? 3
                : 4;

            setIsLoading(true);
            response = await postJoinData(tel, password, joinstate);
            setIsLoading(false);

            if (response.statusText !== "OK")
                throw new Error("에러가 발생했습니다! 다시 시도해보세요.");

            if (joinstate === 3) alert("새로운 계정이 생성되었습니다!");
            else alert(`기존 계정의 비밀번호는 ${response.data.pw} 입니다.`);

            userContext.changePage("Login");
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
            {isLoading && <LoadingScreen />}
        </div>
    );
}

export default Join;
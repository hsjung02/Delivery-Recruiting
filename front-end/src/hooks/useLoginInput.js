import { useRef } from 'react';

function useLoginInput() {
    const telRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const telMessage1 = "전화번호를 입력하세요!";
    const telMessage2 = "유효한 전화번호를 입력하세요!";
    const pwMessage1 = "비밀번호를 입력하세요!";
    const pwMessage2 = "비밀번호 확인란은 비밀번호와 같아야 합니다!";

    const telValidator = args => {
        return /^\d{10,11}/.test(args) && args.length <= 11;
    };

    const notValidAlert = (condition, msg, submittable) => {
        if (condition) {
            alert(msg);
            return false;
        }
        return submittable;
    };

    const checkValidity = e => {
        e.preventDefault();

        const tel = telRef.current.value.trim();
        const password = passwordRef.current.value;
        let submittable = true;

        submittable = notValidAlert(!tel.length, telMessage1, submittable);
        submittable = notValidAlert(tel.length > 0 && !telValidator(tel), telMessage2, submittable);

        submittable = notValidAlert(!password.length, pwMessage1);
        if (passwordConfirmRef.current)
            submittable = notValidAlert(password !== passwordConfirmRef.current.value, pwMessage2, submittable);

        return submittable;
    };

    return [telRef, passwordRef, passwordConfirmRef, checkValidity];
}

export default useLoginInput;
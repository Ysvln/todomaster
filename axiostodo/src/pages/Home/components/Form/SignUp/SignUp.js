import * as S from "../style";
import Button from "components/Button/Button";
import useInputs from "hooks/useInputs";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authApi from "apis/authApi";

function SignUpForm({ setForm }) {
  const [{ email, password, passwordConfirm }, onChangeForm] = useInputs({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (password !== passwordConfirm)
      return setError("비밀번호 확인이 일치하지 않습니다.");
    setError("");
  }, [password, passwordConfirm]);

  const onSubmitJoin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("정보를 입력해주세요");
    }
    if (password !== passwordConfirm) {
      return alert("비밀번호 확인이 일치하지 않습니다");
    }

    // then catch, try catch 컨벤션에 맞춰야 함 ==> then일 때는 성공하고 나서의 로직을 다시 콜백함수로 넘겨야 해서 try를 선호하는 편
    // 이러한 문제를 해결하기 위해 async await , 예외 처리를 위해 try catch
    try {
      const { data } = await authApi.signUp(email, password);
      /* const res = await axios.post("http://localhost:9000/user/sign", {
        // 백엔드와 프론트엔드 주소가 같다. 포트 번호만 다르다. 주소가 생략 가능 => 원래는 생략하면 안 됨
        email,
        password,
      });
      */
      if (!alert(data.data)) {
        setForm("login");
      }
    } catch (err) {
      setError(err.response.data.error);
      // throw => 상위 요소에게 에러 해결해! => 현재 여가에선 상위의 try ...catch가 없기 때문에 window에서 에러를 처리하는데 이때 console 찍는 것과 같은 의미가 됨
      // throw new Error(err);
      console.error(err);
    }
  };

  useEffect(() => {
    setError("");
  }, [email]);

  const full = email && password;

  /*
  과제
    모든 필드가 채워지지 않으면 button의 disabled는 true
      심화. 특정 필드를 지정 후 해당 필드가 채워지지 않으면 disabled는 false
            특정 필드는 유동적일 수 있다.
    email의 이메일 양식이 맞지 않으면 disabled는 true
    비밀번호가 8글자 이상이지 않으면 disabled는 true

    위의 유효성 검사 과정을 커스텀 훅(선택)으로 만들어보세요
    위의 유효성은 로그인 페이지에도 재사용 합니다.
  */

  return (
    <S.Form onSubmit={onSubmitJoin}>
      <S.InputBox>
        <input placeholder="e-mail" name={"email"} onChange={onChangeForm} />
        <span>이메일</span>
      </S.InputBox>
      <S.InputBox>
        <input
          type="password"
          placeholder="password"
          name={"password"}
          onChange={onChangeForm}
        />
        <span>비밀번호</span>
      </S.InputBox>
      <S.InputBox>
        <input
          type="password"
          placeholder="password confirm"
          name={"passwordConfirm"}
          onChange={onChangeForm}
        />
        <span>비밀번호 확인</span>
      </S.InputBox>
      <S.Error visible={error}>{error}</S.Error>
      <Button variant={"primary"} size={"full"} disabled={error || !full}>
        회원가입
      </Button>
    </S.Form>
  );
}
export default SignUpForm;

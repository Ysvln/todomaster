import Button from "components/Button/Button";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "hooks/useInput";
import useInputs from "hooks/useInputs";
import * as S from "../style";
import axios from "axios";

function LoginForm() {
  // const [email, onChangeEmail, setEmail] = useInput("");
  // const [password, onChangePassword, setPassword] = useInput("");

  // const email = useRef();
  // const password = useRef();

  // js에선 location.href 사용 ==> 페이지 정보를 다시 받아옴
  // navigate ==> 페이지 정보를 다시 받아오지 않도록 react-router-dom에 있는 함수를 사용
  const navigate = useNavigate();

  // const onChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  // const onChangePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  // react-hook-form 적용하면 반복적으로 인풋이 랜더링 되는 경우를 막을 수 있음, react-hook-form, zod

  // 객체의 구조분해할당으로 가져온거임
  const [{ email, password }, onChangeForm] = useInputs({
    email: "",
    password: "",
  });

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // env는 수정 후 서버 종료 후 다시 빌드해야 함
      const res = await axios.post(
        // const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/user/login",
        {
          email,
          password,
        }
      );

      const { data } = res.data;

      localStorage.setItem("access_token", data.token);
      if (localStorage.getItem("access_token")) {
        navigate("/todo");
      }

      // console.log(res);
    } catch (err) {
      console.error(err);
      alert("아이디와 비밀번호를 확인해주세요");
    }
  };

  /*
    1. 관심사분리 axios를 하나의 service 파일로 만들 것
    2. axios.interceptor access_token을 넣어줄 것 (header)
    3. locked access_toke이 없으면 todo 요청 불가
    4. 관심사분리 localstorage --> 하나의 service 파일로 만들 것
    5. error handleing, error boundary
    6. eslint, prettier
    7. suspense ==> skeleton UI
  
  */
  return (
    <S.Form onSubmit={onLoginSubmit}>
      <S.InputBox>
        {/* 이메일 입력한 값 state */}
        <input placeholder="e-mail" name="email" onChange={onChangeForm} />
        <span>이메일</span>
      </S.InputBox>
      <S.InputBox>
        {/* 비밀번호 입력한 값 state */}
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onChangeForm}
        />
        <span>비밀번호</span>
      </S.InputBox>
      <Button variant={"primary"} size={"full"}>
        {/*  */}
        로그인
      </Button>
    </S.Form>
  );
}
export default LoginForm;

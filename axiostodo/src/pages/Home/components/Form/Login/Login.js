import Button from "components/Button/Button";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "hooks/useInput";
import useInputs from "hooks/useInputs";
import * as S from "../style";
import axios from "axios";
import authApi from "apis/authApi";

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

    /*
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

      */

    try {
      const { data: response } = await authApi.login(email, password);
      console.log(response.token);

      // token == access_token
      // token 값을 저장할 것, token 값이 있다면 로그인이 된 것
      // 프론트엔드 로그인 유무 판단
      /* 
        1. 웹스토리지 (로컬, 세션스토리지)
        2. state (redux-persist) => 비추? 새로고침하면 X..
        3. refreshToken 
            access_token은 어디에 저장하든 탈취의 위험이 있다.
            따라서 access_token이 탈취되어도 이 토근에 기간을 설정해서
            해커에게 제어권이 넘어가는 시간을 최소화한다.

            access_token => 만료 => 사용자는 접근 권한 X => 프론트엔드 로그아웃 처리를 

            사용자가 불편

            요청할 때 access_token --> refresh --> access_token 만료(error)

            프론트엔드 ---> access_token 재발급 --> 다시 http request에 실어서 재요청


            browser       ID PW =====>      BACK
                    <===== token, refresh
                    
            브라우저에서 다음 요청을 보낼 때 마다 request에서 header 부분에 token 
            BACK은 token이 유효한지 확인 , 유효하지 않으면 브라우저에 다시 유효성 에러로
            브라우저 ==> 1. 세션 만료되면 로그아웃 2. refresh 토큰 ==> BACK에 요청


            ** 재요청 
              browser      유효X =====>      BACK
                        <===== error
                              ^
                            axios가 intercept - BACK에 refresh 전달해서 - BACK으로부터 다시 token을 받는다.
                            이걸 브라우저에 보내지 않고 다시 BACK에 재요청을 한다.
                            BACK은 그 재요청을 받고 이번에는 유효한 token
          03.05 02:15

      */

      // console.log(res);
      navigate("/todo");
    } catch (err) {
      console.log(err);
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

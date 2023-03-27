import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexCenter } from "../../styles/common";
import LoginForm from "./components/Form/Login/Login";
import SignUpForm from "./components/Form/SignUp/SignUp";

function HomePage() {
  const [form, setForm] = useState("login");

  const onFormChange = (e) => {
    // 클릭 상태를 state로 관리
    const { innerText } = e.target;
    setForm(innerText.toLowerCase());
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.LoginSelector mode={form} onClick={onFormChange}>
          LOGIN
        </S.LoginSelector>
        <S.SignUpSelector mode={form} onClick={onFormChange}>
          SIGN
        </S.SignUpSelector>
      </S.Header>
      {form === "login" ? <LoginForm /> : <SignUpForm setForm={setForm} />}
      {/* <a href="/todo">일반 투두페이지로 이동</a>
      <Link to="/todo">라우터로 투두페이지 이동</Link> */}
    </S.Wrapper>
  );
}
export default HomePage;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  display: flex;
  ${flexCenter}
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};
  width: 360px;
  height: 48px;
  position: relative;
  display: flex;

  & > div {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover {
      background-color: #e0e0e0;
    }
  }
`;

const LoginSelector = styled.div`
  background-color: ${({ mode }) =>
    mode === "login" ? "#e0e0e0" : "#f5f5f5f5"};
`;

const SignUpSelector = styled.div`
  background-color: ${({ mode }) =>
    mode === "SignUp" ? "#e0e0e0" : "#f5f5f5f5"};
`;

const S = {
  Wrapper,
  Header,
  LoginSelector,
  SignUpSelector,
};

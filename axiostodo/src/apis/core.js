import axios from "axios";

export const Axios = (isToken) =>
  axios.create({
    // isToken 유무에 따라 => 의존성 역전원칙
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // header: ,
  });

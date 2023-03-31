import axios from "axios";
import TokenService from "repository/TokenService";

export const Axios = axios.create({
  // isToken 유무에 따라 => 의존성 역전원칙
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    //              ⬇️ 보안 아이템
    Authorization: `Bearer ${TokenService.getToken()}`,
  },
});

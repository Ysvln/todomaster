const TOKEN_KEY = "access_token";

const TokenService = {
  //set
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  //get
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  //remove
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

// 웹스토리지에 대한 이해가 조금 더 필요한 듯..

export default TokenService;

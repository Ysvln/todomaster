const { Axios } = require("./core");

const PATH = "/user";

const authApi = {
  // 객체 안에 함수 => 메서드
  async login(email, password) {
    const res = await Axios.post(PATH + "/login", { email, password });
    return res.data;
  },
  signUp(email, password) {
    return Axios.post(PATH + "/sign", { email, password });
  },
};

export default authApi;

/*

    이 페이지를 제작하기 위한 api 정리

    1. axios.get("/todo")
        ==> return 값 ==> todolist

       axios.post("/todo", {content, title})
        ==> return 값 ==> {todo}

       axios.post("/todo/$id", {content, title})
        ==> return 값 ==> {update todo}

       axios.delete("/todo/$id")
        ==> return 값 ==> id

    2. 사용자가 todo페이지에 접속했습니다
        페이지에게 어떤 것이 렌더링 되어야 하나요? --- todoList --- axios.get
        todoList는 state로 관리해야 할까요? ---> state로 관리 ---> useState

        화면이 렌더링 될 때마다 axios 새로 가지고 와야할까?
        axios를 해야할 순간 --> 페이지가 처음 열렸을 때 --> useEffect

*/

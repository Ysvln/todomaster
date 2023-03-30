const { Axios } = require("./core");

const PATH = "/todo";

const TodoApi = {
  getTodo() {
    return Axios.get(PATH);
  },
  addTodo({ content, title }) {
    return Axios.post(PATH, { content, title });
  },
  updateTodo(id, { content, state }) {
    return Axios.put(PATH + `/${id}`, {
      content,
      state,
    });
  },

  deleteTodo(id) {
    return Axios.delete(PATH + `/${id}`);
  },
};

export default TodoApi;

const { createContext, useReducer } = require("react");

const initialState = [];

const TodoListContext = createContext();
const TodoDispatchContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      /*
            ADD_TODO를 하기 위해
            action.payload에 어떤 데이터가 와야 할까?
            =>id, title, content
        */

      return [action.payload, ...state];

    case "DELETE_TODO":
      /*  => id */
      return state.filter((todo) => todo.id !== action.payload);
    case "UPDATE_TODO":
      /*  => id, content, state */
      const newTodo = [...state];
      const todoIndex = newTodo.findIndex(
        (todo) => todo.id === action.payload.id
      );
      newTodo[todoIndex].content = action.payload.content;
      newTodo[todoIndex].state = action.payload.state;

      // 값이 바뀐 것은 newTodo이기 때문에 newTodo를 리턴한다.
      return newTodo;
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  //children => 하위에 있는 모든 컴포넌트
  const [todoList, dispatch] = useReducer("", initialState);

  return (
    /* 
    Context ===================================================
        비어있는 저장소를 만들고 
        => 그 저장소에 value 값을 채워넣음 
        => 그리고 그 값을 children에 전달. 
        => 이때 children은 app.js에 있는 하위 컴포넌트일 것이다. (index.js에 해도 무관하지만 컨벤션에 맞춰야 한다.)
    */
    <TodoListContext.Provider value={todoList}>
      <TodoDispatchContext value={dispatch}>{children}</TodoDispatchContext>
    </TodoListContext.Provider>
  );
};

export default TodoProvider;

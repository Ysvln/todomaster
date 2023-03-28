/* eslint-disable array-callback-return */
// import { useDispatch } from "react-redux";
// import { deleteTodo, updateTodo } from "store/todo";
import TodoCard from "./Card/Card";

function TodoList({ todoList, setTodoList }) {
  // const dispatch = useDispatch();

  const handleUpdateTodo = (id, content, state) => {
    // dispatch(updateTodo({ id, content, state }));
    /*
      action.payload = {
        id, 
        content, 
        state
      }
    */
  };

  const onDeleteTodo = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // dispatch(deleteTodo(id));
      /* action.payload = id */
    }
  };

  return (
    <div>
      {todoList.map((todo) => {
        console.log(todo);
        return (
          <TodoCard
            todo={todo}
            example={"test"}
            handleEdit={handleUpdateTodo}
            onDelete={onDeleteTodo}
          />
        );
      })}
    </div>
    // 상위 컴포넌틍서 하위 컴포넌트로 데이터를 전달하기 위해
    // props(속성)을 사용하여 데이터를 전달
  );
}

export default TodoList;

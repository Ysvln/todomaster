/* eslint-disable array-callback-return */
// import { useDispatch } from "react-redux";
// import { deleteTodo, updateTodo } from "store/todo";
import TodoCard from "./Card/Card";
import { Suspense } from "react";
import TodoApi from "apis/todoApi";

function TodoList({ todoList, setTodoList }) {
  // const dispatch = useDispatch();

  const handleUpdateTodo = async (id, content, state) => {
    // dispatch(updateTodo({ id, content, state }));
    /*
      action.payload = {
        id, 
        content, 
        state
      }
    */
    try {
      const { data } = await TodoApi.updateTodo(id, { content, state });
      const newTodoList = [...todoList];
      const index = newTodoList.findIndex((todo) => todo.id === data.data.id);
      newTodoList[index] = data.data;
      setTodoList(newTodoList);
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteTodo = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const { data } = await TodoApi.deleteTodo(id);
      setTodoList(todoList.filter((todo) => todo.id !== data.data));

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

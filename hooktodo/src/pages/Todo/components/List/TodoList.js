/* eslint-disable array-callback-return */
import TodoCard from "./Card/Card";

function TodoList({ todoList, setTodoList }) {
  const handleUpdateTodo = (id, content, state) => {
    // state의 불변성을 지켜야 함 todoList에서 가져와서 바로 set 하면 안 됨
    const newTodoList = [...todoList];
    const todo = newTodoList.find((todo) => todo.id === id);
    todo.content = content;
    todo.state = state;
    setTodoList(newTodoList);
  };

  const onDeleteTodo = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const deleteTodoList = todoList.filter((todo) => todo.id !== id);
      // 새로운 배열을 반환하는 메서드는 이미 불변성을 지키고 있기 때문에 불변성을 지킬 필요가 없다.
      setTodoList(deleteTodoList);
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

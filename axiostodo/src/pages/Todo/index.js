import styled from "styled-components";
import { flexCenter, flexAlignCenter } from "../../styles/common";
import Button from "components/Button/Button";
import TodoList from "./components/List/TodoList";
import TodoFormModal from "./components/Modal/TodoForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Suspense, useEffect, useState } from "react";
import TodoApi from "apis/todoApi";
// import { useDispatch, useSelector } from "react-redux";
// import { addTodo } from "store/todo";

export const print = () => {
  console.log("반갑습니다");
};

// index 페이지에 기능 구현 , 컴포넌트 단위에서 기능 구현하는 것을 지양
// 다른 코드의 의존성을 낮추고 재사용성을 높게 제작

function TodoPage() {
  // state
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);
  // const todoList = [];
  // const dispatch = useDispatch();
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const getTodoList = async () => {
      const res = await TodoApi.getTodo();
      console.log(res);
      setTodoList(res.data.data);
    };

    getTodoList();
  }, []);

  // toast
  const handleAddTodo = (title, content) =>
    new Promise(async (resolve, reject) => {
      if (!title || !content) {
        return alert("빈칸을 채워주세요");
      }
      return TodoApi.addTodo({ title, content })
        .then((res) => {
          if (res.status === 200) {
            setTodoList([res.data.data, ...todoList]);
            resolve(res);
          }

          setIsOpenAddTodoModal(false);
        })
        .catch((err) => {
          throw new Error(err);
        });

      // const newTodo = {
      //   // id: Math.floor(Math.random() * 100000), ==> arr.length + 1 이런 식으로 작성하면 id가 겹칠 가능성이 크다.
      //   // state: false,
      //   title,
      //   content,
      // };
      // resolve(res);
    });
  // .then((res) => {
  //   // res에는 newTodo가 온다.(resolve의 값을 가져옴)
  //   // const newTodoList = [...todoList].push(res)
  //   // setTodoList(newTodoList)
  //   // dispatch(addTodo(res));
  //   /*
  //     dispatch({
  //       type : "ADD_TODO",
  //       payload : rese
  //     })
  //   */
  //   // setTodoList([res, ...todoList]);
  //   setIsOpenAddTodoModal(false);
  // })
  // .catch((err) => {
  //   //err에는 need fullfiled가 온다.
  //   alert(err);
  // });

  const showAddTodoToastMessage = (title, content) => {
    // e.preventDefault() ==> onclick을 막아서 사용하면 안 됨
    // form 태그 action ==> 페이지 이동 막기 위해 (기존에 가지고 있는 기능을 막음)
    toast.promise(handleAddTodo(title, content), {
      pending: "TODO LOADING",
      success: "TODO SUCCESS",
      error: "TODO ERROR",
    });
  };

  const handleOpenTodoAddModalBtn = () => {
    setIsOpenAddTodoModal(true);
  };

  const handleCloseTodoAddModalBtn = () => {
    setIsOpenAddTodoModal(false);
  };

  return (
    <>
      {isOpenAddTodoModal && (
        <TodoFormModal
          showAddTodoToastMessage={showAddTodoToastMessage}
          onClose={handleCloseTodoAddModalBtn}
        />
      )}
      <S.Wrapper>
        <S.Container>
          <S.Title>List</S.Title>
          <S.Content>
            <TodoList todoList={todoList} setTodoList={setTodoList} />
          </S.Content>
          <S.ButtonBox>
            {/* 괄호 안 감싸도 상관 없음. 프롭스 전달하는 것만 감싸는 의미정도 */}
            <Button
              variant={"primary"}
              size={"full"}
              onClick={handleOpenTodoAddModalBtn}
            >
              추가
            </Button>
          </S.ButtonBox>
        </S.Container>
        <ToastContainer autoClose={2000} theme="colored" />
      </S.Wrapper>
    </>
  );
}

export default TodoPage;
// export default 되어있는 경우 경로만 맞으면 내 마음대로 이름을 정해서 가지고 올 수 있구요
// export 되어있는 경우는 {} 구조분해할당을 통해 해당 export된 변수명 혹은 함수명 등을 이용해여 key값으로 가지고온다

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter};
`;

const Container = styled.div`
  width: 420px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};
  color: ${({ theme }) => theme.PALETTE.fontColor};
  padding-left: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const S = {
  Wrapper,
  Container,
  Title,
  ButtonBox,
  Content,
};

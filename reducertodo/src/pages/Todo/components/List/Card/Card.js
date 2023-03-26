import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan, faPen } from "@fortawesome/free-solid-svg-icons";
// 굵기 등 설정에 따라 따로 설치해서 사용할 수 있음 (하단 참고)
// import { faCheck, faBan, faPen } from "@fortawesome/free-thin-svg-icons";
import { flexCenter, flexAlignCenter } from "styles/common";
import { useState } from "react";
import useInput from "hooks/useInput";

function TodoCard(props) {
  // hook 문제 참고하기 =================================================
  // 데이터 안에 edit을 추가하지 않은 이유에 대해 생각해봐야함!!
  // --> edit이 바깥에 있으면 todoPage에 있는 모든 컴포넌트가 다시 랜더링 될 것임
  // state는 왜 todolist 데이터 안에 포함했는지? 에 대해서도 생각해봐야함!
  // --> state는 애초에 데이터에 포함되는 항목이라 그렇다!
  const { handleEdit, onDelete } = props;
  const { id, state, title, content } = props.todo;

  const [isTodoEdit, setIsTodoEdit] = useState(false);
  const [editContent, onChangeEidtContent] = useInput(content);

  const onSetIsTodoEditTrue = () => {
    setIsTodoEdit(true);
  };

  const onClickTodoEditBtn = () => {
    if (editContent === content) return setIsTodoEdit(false);
    handleEdit(id, editContent, state);
    setIsTodoEdit(false);
  };

  const onClickTodoSatetEditbtn = () => {
    handleEdit(id, content, !state);
  };

  return (
    // styled, state로 css를 관리 className , dom api를 사용하지 않아도 된다는 장점
    <S.Wrapper state={state}>
      <S.Header>
        <S.StateBox state={state} onClick={onClickTodoSatetEditbtn}>
          <FontAwesomeIcon icon={faCheck} />
        </S.StateBox>
        <S.Title state={state}>
          {title}
          <div>
            <FontAwesomeIcon
              icon={faPen}
              onClick={isTodoEdit ? onClickTodoEditBtn : onSetIsTodoEditTrue}
            />
            <FontAwesomeIcon icon={faBan} onClick={() => onDelete(id)} />
            {/* onClick={onDelete} 쓰지 않는 이유 ==> 매개변수로 event 들어감 그래서 익명함수 써서 작성 */}
          </div>
        </S.Title>
      </S.Header>
      <S.Content state={state}>
        {isTodoEdit ? (
          <textarea value={content} onChange={onChangeEidtContent}></textarea>
        ) : (
          content
        )}
      </S.Content>
    </S.Wrapper>
  );
}

export default TodoCard;

// fontawesome
// styled-components || emotion

/*
css-in-js

    js 파일 안에 css를 정의 가능
    css를 모듈 단위로 나누어 관리할 수 있다는 장점과 
    하나의 js 파일 안에 css를 관리할 수 있다는 장점

    많은 개발자들이 사용하고 있는 유지보수가 쉽다는 점
    가독성이 굉장히 좋아짐

    따라서, reactJS나 vueJS와 같은 js 프론트엔드 프레임워크를 사용하면
    scss나 css보다는 css-in-js를 많이 사용

*/

const Wrapper = styled.li`
  width: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid #999;
  margin: 16px 0;
  border-radius: 8px;
  background-color: ${({ state, theme }) =>
    state ? theme.PALETTE.gray[100] : theme.PALETTE.white};
`;

const Header = styled.div`
  border-bottom: 1px dotted #999;
  ${flexAlignCenter};
  padding: 8px 16px;
  height: 48px;
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  & svg {
    cursor: pointer;
    margin-left: 16px;
    :hover {
      transform: scale(1.2);
    }
  }
`;

const StateBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  ${flexCenter};
  color: ${({ state }) => (state ? "#3CB371" : "#999")};
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

const Content = styled.div`
  padding: 16px;
  text-decoration: ${({ state }) => (state ? "line-through" : "none")};
  & textarea {
    width: 100%;
    height: 100%;
    border: 1px dotted #999;
    outline: none;
    resize: none;
  }
`;

const S = {
  Wrapper,
  Header,
  StateBox,
  Title,
  Content,
};

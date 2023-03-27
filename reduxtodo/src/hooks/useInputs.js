import { useState } from "react";

const useInputs = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const onChange = (event) => {
    setValues((prev) => ({
      // 함수가 아닌 객체를 리턴해서 () 괄호 사용
      ...prev,
      // 현재 이벤트가 일어나는 타켓의 name을 키값으로 받음
      // 키값의 속성 값을 value로 바꿈
      [event.target.name]: event.target.value,
    }));

    /*
    state 불변성 (값이나 상태를 변경할 수 없는 것)

    state는 이전 상태값과 비교하여 값이 달라졌는지 확인하고
    값이 달라졌으면 랜더링

    object
    이전 참조값과 현재 참조값만을 비교하여 상태 변화를 감지 및 랜더링
    리액트에서 오브젝트(배열 및 객체)의 원본 데이터가 변경되면 (훼손되면)
    리액트가 상태 변화를 감지할 수 없어서 깊은 복사를 통해 새로운 참조값 생성
    해당 참조값을 가진 오브젝트로 업데이트

    따라서 이렇게 되면 원본데이터와 새로운 참조값 데이터를 비교할 수 있고
    화면을 랜더링 할 수 있음

    이점 사이드 이펙트(외부효과)의 배제를 통한 예상치 못한 상황(엣지 케이스)를 방지
    리액트의 state는 하나의 컴포넌트가 참조하는 것이 아니라
    굉장히 많은 컴포넌트가 참조할 수 있다.

    그러나 한 가지 기능을 위해 state 값이 수정되면
    해당 상태를 참조하고 있는 다른 component에서 예상치 못하는 에러가 발생할 수 있음

    1. 효율적인 상태 업데이트
        얕은 비교를 통해(객체의 속성값을 일일히 확인하지 않아도)
        참조 값만을 비교하여 상태를 업데이트하기 때문에 코스트를 줄이고 효율적으로 상태를 업데이트 가능.

    2. 사이드 이펙트 방지

    => 깊은 복사를 통한 얕은 비교로 상태를 업데이트한다.



    */
  };

  return [values, onChange, setValues];
};

export default useInputs;

/*

리액트는 이전 상태와 현재 상태를 비교해서 값이 변경되었을 때 렌더링을 함 (업데이트함)

깊은 복사를 통해 얕은 비교가 가능하게 함
얕은 비교 ==> 값만 비교!!

객체는 주소값이 저장됨
완전 다른 객체는 서로 주소값이 다름


const value = {
  email : "test@test.com",
  password : "1234"
}

value.password : "45678"
setState(value)

(prev)value (current)value
===> 각 value의 참조값이 같다
===> 같으면 비교하기 힘들다 (왜냐하면, 안에 있는 프로퍼티값을 다 비교해야해서)

-------------------------------------

const newValue = {
  ...value
}

setState(newValue)

==> 주소값이 달라서 바로 업데이트가 가능하다.

*/

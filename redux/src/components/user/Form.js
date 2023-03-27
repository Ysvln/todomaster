import { useRef } from "react";
import { useDispatch } from "react-redux";

const UserAddForm = () => {
  const dispatch = useDispatch();
  const name = useRef(null);

  const onAddUser = () => {
    dispatch({
      type: "ADD_USER",
      payload: {
        id: Math.floor(Math.random() * 100000),
        name: name.current.value,
      },
    });
  };

  return (
    <>
      <input ref={name} />
      <button onClick={onAddUser}>추가</button>
    </>
  );
};

export default UserAddForm;

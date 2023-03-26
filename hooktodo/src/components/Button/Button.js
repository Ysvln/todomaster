import * as S from "./style";

function Button(props) {
  // 전개연산자 ... -> rest라고 안 해도 됨
  // onClick 등 다른 속성 하나하나 안 쓰고 rest라고 작성
  const { variant, shape, size, children, ...rest } = props;

  // children -> 버튼이 감싸고 있는 자식
  return (
    <S.Button variant={variant} shape={shape} size={size} {...rest}>
      {children}
    </S.Button>
  );
}

export default Button;

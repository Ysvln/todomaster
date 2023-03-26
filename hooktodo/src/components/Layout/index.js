import { Outlet } from "react-router-dom";
import BasicFooter from "./Footer/Footer";
import BasicHeader from "./Header/Header";

// header와 footer가 합쳐지는 파일
function Layout({ children }) {
  return (
    <>
      <BasicHeader />
      <Outlet />
      {/* {children} ==> routing의 HomePage, TodoPage -- 자식요소를 가져오지 X Outlet 사용 */}
      <BasicFooter />
    </>
  );
}

export default Layout;

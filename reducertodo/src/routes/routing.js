import Layout from "components/Layout";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import TodoPage from "../pages/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    // layout이 있는 페이지도 있고 없는 페이지도 있음 => 적용하는 부분만 사용할 수 있도록
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "todo",
        element: <TodoPage />,
      },
    ],
    // loader 백엔드와 소통할 때
  },
  {
    path: "todo",
    element: <TodoPage />,
  },
]);

export default router;

import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";

import HomePage from "./pages/Home";
import TodoPage from "./pages/Todo";
import theme from "./styles/theme";
import router from "./routes/routing";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <GlobalStyles />
        HTML5를 지원하는 브라우저 주소를 감지 (html이 하나밖에 없어서 주소에 따라 보여주는 컴포넌트를 달리한다)
        <Routes>
          Route path와 감지한 주소가 일치한 router만을 랜더링 시켜주는 역할 
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </BrowserRouter> */}
    </ThemeProvider>
  );
}
export default App;

import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";

import HomePage from "./pages/Home";
import TodoPage from "./pages/Todo";
import theme from "./styles/theme";
import router from "./routes/routing";
import TodoProvider from "contexts/todo";

function App() {
  return (
    <TodoProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </TodoProvider>
  );
}
export default App;

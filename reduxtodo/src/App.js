import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import { Provider } from "react-redux";
import HomePage from "./pages/Home";
import TodoPage from "./pages/Todo";
import theme from "./styles/theme";
import router from "./routes/routing";
import { store } from "store/store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}
export default App;

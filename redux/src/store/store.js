import { rootReducer } from "../reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
// import { createStore } from "redux";

const reduxConfig = () => {
  //App.js에 있던 store을 따로 뺀 것
  const store = createStore(
    rootReducer,
    process.env.NODE_ENV === "development" &&
      composeWithDevTools(applyMiddleware(logger))
  );
  return store;
};

// 같은 표현 export const store = createStore(rootReducer);

export default reduxConfig;

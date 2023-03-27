import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./_root";
import { composeWithDevtools } from "redux-devtools-extension";
import logger from "redux-logger";

export const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development" &&
    composeWithDevtools(applyMiddleware(logger))
);

//rootReducer ===> 채워넣는다
//middleware ===> 설정

import { createStore } from "redux";
import { Provider } from "react-redux";
import User from "./components/user";
import { rootReducer } from "./reducer";
import reduxConfig from "./store/store";
import { useEffect } from "react";

function App() {
  // const store = createStore(rootReducer);
  const store = reduxConfig();

  useEffect(() => {
    console.log("Start");
  }, []);
  console.log(process.env.NODE_ENV);

  /*
    1. development 
      개발자용 (npm start)

    2. production
      npm build -> 생성된 (번들링 된) -> 사용자가 보게될 화면
  
  */

  /*
    1. src -> reducer 폴더생성 -> rootReducer.js 파일을 생성
      reducer는 여러 파일이 생성될 수 있으므로 reducer들을 하나로 합칠 rootReducer가 필요하다.
      export const rootReducer = combineReducers({})

    2. 비어있는 store를 생성
      createStore();

    3. store에 reducer를 채웠다.
      createStore(rootReducer);

      store에 다양한 기능을 위해 함수 형태로 만들 필요가 있다.
      store -> store.js 로 store를 빼서 함수형으로 만들었다.

      const reduxConfig = () => {
       //App.js에 있던 store을 따로 뺀 것
        const store = createStore(rootReducer);
        return store;
      };

    4. Provider (덮개)를 생성. app.js에서 덮고 store 속성에 내가 만든 store 전달
      import {Provider} from "react-redux"

      return (
        <Provider store={store}>
          <User />
        </Provider>
      );
  */
  return (
    <Provider store={store}>
      <User />
    </Provider>
  );
}

export default App;

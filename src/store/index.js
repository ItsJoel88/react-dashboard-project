import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
// import { persistStore } from "redux-persist";

// this is collect for saga watchers
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;

if (process.env.NODE_ENV === "development") {
  const composeWithDevToolsExtension =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if (typeof composeWithDevToolsExtension === "function") {
    composeEnhancers = composeWithDevToolsExtension;
  }
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// export const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export default store;

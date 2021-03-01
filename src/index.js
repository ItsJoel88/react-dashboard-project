import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./App";
import store from "./store";
import "assets/sass/all.scss";
import { setupAxios } from "./utils/setupAxios"

setupAxios(axios)

ReactDOM.render(<App store={store} />, document.getElementById("root"));

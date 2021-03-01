import * as FORM from "./form.constants";

const DEFAULT_STATE = {
  loadingForm: true,
  loadingSubmit: false,
  data: null,
  formError: {
    isShown: false,
    message: "",
    statusCode: "",
    title: "",
  },
  formSuccess: {
    isShown: false,
    message: "",
    statusCode: "",
    title: "",
  },
  editable: false,
  detailUnauthorized: {
    isShown: false,
    title: "",
    data: "",
  },
  dataApi: {
    result: "",
    responseData: "",
  },
  getApi: {
    action: null,
    params: "",
    body: "",
    callback: "",
  },
  menu: {},
  stopSetState: null,
  foundMenu: false,
  dataArray: [],
};

const ACTION_HANDLERS = {
  [FORM.SET_STATE]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [FORM.CHANGE_ATTRIBUTE]: (state, action) => {
    const obj = action.payload;
    const updateState = {
      ...state,
    };

    if (typeof obj === "object" && !Array.isArray(obj)) {
      Object.keys(obj).forEach((key) => {
        updateState[key] = obj[key];
      });
    }
    return Object.assign({}, state, updateState);
    // const { value, key } = action.payload;

    // const updateState = {
    //   ...state,
    //   [key]: value,
    // };

    // return Object.assign({}, state, updateState);
  },
  [FORM.INIT]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [FORM.RESET]: (state, action) => {
    return Object.assign({}, state, DEFAULT_STATE);
  },
};
export const reducer = (state = DEFAULT_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

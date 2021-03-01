import * as TABLE from "./table.constants";

const DEFAULT_STATE = {
  getApi: {
    action: null,
    params: "?",
    body: "",
    callback: "",
  },
  dataApi: {
    result: "",
    responseData: "",
  },
  loadingTable: true,
  items: [],
  page: 1,
  limit: 10,
  count_pages: 0,
  count_rows: 0,
  count_pending: 0,
  periode: "",
  start_date: "",
  end_date: "",
  search: "",
  sort_by: "",
  sort_type: "desc",
  warehouse_id: "",
  status: "",
  current_page: "",
  status_response: "",
  customFilter: {},
  tableUnauthorized: {
    isShown: false,
    title: "",
    data: "",
  },
  tableError: {
    isShown: false,
    message: "",
    statusCode: "",
    title: "",
  },
};

const ACTION_HANDLERS = {
  [TABLE.SET_STATE]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [TABLE.CHANGE_ATTRIBUTE]: (state, action) => {
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
  },
  [TABLE.INIT]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [TABLE.RESET]: (state, action) => {
    return Object.assign({}, state, DEFAULT_STATE);
  },
};
export const reducer = (state = DEFAULT_STATE, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

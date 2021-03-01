import { call, put, takeLatest, select, all } from "redux-saga/effects";

import * as constants from "./table.constants";

// declare method for passing to props from reducer
export const actionToProps = {
  fetchTableDataFromApi: () => {
    return { type: constants.FETCH_DATA_API };
  },
  resetTableAttribute: () => ({ type: constants.RESET }),
  fetchTableItemsApi: () => ({ type: constants.FETCH_API }),
  setTableItems: () => ({ type: constants.SET_STATE }),
  changeTableAttribute: (obj = {}) => ({
    type: constants.CHANGE_ATTRIBUTE,
    payload: obj,
  }),
};

function* sagaFetchDataFromApi() {
  const state = yield select();

  const {
    table: {
      dataApi: { data },
    },
  } = state;

  if (data.response) {
    yield all([
      put(
        actionToProps.changeTableAttribute({
          dataApi: { result: data, responseData: data.response },
        })
      ),
    ]);
  } else {
    yield all([
      put(
        actionToProps.changeTableAttribute({
          tableError: {
            isShown: data.error.status === 500 ? true : false,
            title: "Error Information - 500",
            message: "Internal Server Error",
            statusCode: data.error.status,
          },
          status_response: data.error.status,
          detailUnauthorized: {
            isShown: data.error.status === 401 ? true : false,
            title: "Anda tidak memiliki akses halaman ini!",
          },
        })
      ),
    ]);
  }
}

// declare method for takeLatest saga and api fetch here
function* sagaFetchApi() {
  const state = yield select();

  const {
    table: {
      getApi: { action, params },
      periode,
      start_date,
      end_date,
      page,
      limit,
      search,
      customFilter,
      sort_by,
      sort_type,
      warehouse_id,
      status,
      payment_type,
    },
  } = state;

  let parameter = {
    search,
    periode,
    start_date,
    end_date,
    warehouse_id,
    status,
    payment_type,
  };

  var otherParams = "";
  if (customFilter && Object.keys(customFilter).length > 0) {
    otherParams = Object.keys(customFilter)
      .map(function (key) {
        return key + "=" + customFilter[key];
      })
      .join("&");
  }

  let requestParams = `?page=${page}&limit=${limit}&sort_by=${sort_by}&sort_type=${sort_type}`;
  Object.keys(parameter).forEach((param) => {
    requestParams = parameter[param]
      ? `${requestParams}&${param}=${parameter[param]}`
      : requestParams;
  });
  requestParams =
    otherParams !== "" ? `${requestParams}&${otherParams}` : requestParams;

  // debugger

  let { response, error } = yield call(action, requestParams, params);

  if (response) {
    const {
      result: { data, count_pages, count_rows, count_pending },
    } = response.data;

    yield all([
      put(
        actionToProps.changeTableAttribute({
          items: data,
          count_pages,
          count_rows,
          count_pending,
          loadingTable: false,
          status_response: response.status,
          tableUnauthorized: {
            isShown: response.status === 401 ? true : false,
            title: "Anda tidak memiliki akses halaman ini!",
          },
        })
      ),
      // put(actionToProps.changeTableAttribute({ key: "items", value: data })),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "count_pages",
      //     value: count_pages,
      //   })
      // ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "count_rows",
      //     value: count_rows,
      //   })
      // ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "count_pending",
      //     value: count_pending ? count_pending : 0,
      //   })
      // ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "loadingTable",
      //     value: false,
      //   })
      // ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "status_response",
      //     value: response.status,
      //   })
      // ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "tableUnauthorized",
      //     value: {
      //       isShown: response.status === 401 ? true : false,
      //       title: "Anda tidak memiliki akses halaman ini!",
      //     },
      //   })
      // ),
    ]);
  } else {
    yield all([
      put(
        actionToProps.changeTableAttribute({
          tableError: {
            isShown: error.status === 500 ? true : false,
            title: "Error Information - 500",
            message: "Internal Server Error",
            statusCode: error.status,
          },
          status_response: error.status,
          tableUnauthorized: {
            isShown: error.status === 401 ? true : false,
            title: "Anda tidak memiliki akses halaman ini!",
          },
          loadingTable: false,
        })
      ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "tableError",
      //     value: {
      //       isShown: error.status === 500 ? true : false,
      //       title: "Error Information - 500",
      //       message: "Internal Server Error",
      //       statusCode: error.status,
      //     },
      //   })
      // ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "status_response",
      //     value: error.status,
      //   })
      // ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "tableUnauthorized",
      //     value: {
      //       isShown: error.status === 401 ? true : false,
      //       title: "Anda tidak memiliki akses halaman ini!",
      //     },
      //   })
      // ),
      // put(
      //   actionToProps.changeTableAttribute({
      //     key: "loadingTable",
      //     value: false,
      //   })
      // ),
    ]);
  }
}

export default function* sagas() {
  yield takeLatest(constants.FETCH_API, sagaFetchApi);
  yield takeLatest(constants.FETCH_DATA_API, sagaFetchDataFromApi);
}

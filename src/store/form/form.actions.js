import { call, put, takeLatest, select, all } from "redux-saga/effects";

import * as constants from "./form.constants";

// declare method for passing to props from reducer
// console.log(constants)
export const actionToProps = {
  resetFormAttribute: () => ({ type: constants.RESET }),
  fetchFormItemsApi: () => ({ type: constants.FETCH_API }),
  // setTableItems: () => ({type: constants.SET_STATE}),
  fetchFormDataFromApi: () => {
    return { type: constants.FETCH_DATA_API };
  },
  fetchFormDetailApi: () => {
    return { type: constants.FETCH_DETAIL_API };
  },
  fetchSelectOptionBarangApi: () => {
    return { type: constants.FETCH_SELECTOPTIONBARANG_API };
  },
  fetchFormSubmitApi: () => {
    return { type: constants.FETCH_SUBMIT_API };
  },
  changeFormAttribute: (obj = {}) => ({
    type: constants.CHANGE_ATTRIBUTE,
    payload: obj,
  }),
};

// declare method for takeLatest saga and api fetch here
function* sagaFetchApi() {
  const state = yield select();

  const {
    form: {
      getApi: { action, params, body, header, field },
    },
  } = state;

  let requestParams = `${params}`;

  let { error, response } = yield call(action, requestParams, body, header);

  if (response) {
    const { result } = response.data;

    if (field) {
      yield all([
        put(
          actionToProps.changeFormAttribute({
            [field]: result.data ? result.data : result,
            dataApi: { result: response, responseData: response.data },
          })
        ),
        // put(actionToProps.changeFormAttribute({ key: field, value: (result.data ? result.data : result) })),
        // put(actionToProps.changeFormAttribute({ key: 'dataApi', value: {result: response, responseData: response.data} })),
      ]);
    } else {
      yield all([
        put(
          actionToProps.changeFormAttribute({
            data: result,
            dataApi: { result: response, responseData: response.data },
          })
        ),
        // put(actionToProps.changeFormAttribute({ key: 'data', value: result })),
        // put(actionToProps.changeFormAttribute({ key: 'dataApi', value: {result: response, responseData: response.data} })),
      ]);
    }
  } else {
    let message = "";
    if (error.status === 404) {
      message = "Not Found";
    } else if (error.status === 500) {
      message = "Internal Server Error";
    }
    yield all([
      put(
        actionToProps.changeFormAttribute({
          status_response: error.status,
          detailUnauthorized: {
            isShown: error.status === 401 ? true : false,
            title: "Anda tidak memiliki akses halaman ini!",
          },
          formError: {
            isShown: error.status !== 401,
            title: `Error Information - ${error.status}`,
            message,
            statusCode: error.status,
          },
        })
      ),
      // put(actionToProps.changeFormAttribute({ key: 'formError', value: {
      //   isShown: error.status !== 401,
      //   title: `Error Information - ${error.status}`,
      //   message,
      //   statusCode: error.status
      // } })),
      // // put(actionToProps.changeFormAttribute({ key: 'dataApi', value: {result: response, responseData: response.data} })),
      // put(actionToProps.changeFormAttribute({ key: 'status_response', value: error.status })),
      // put(actionToProps.changeFormAttribute({ key: 'detailUnauthorized', value:{ isShown: (error.status === 401 ? true : false) ,title: 'Anda tidak memiliki akses halaman ini!'}})),
    ]);
  }
}
function* sagaFetchDataFromApi() {
  const state = yield select();

  const {
    form: {
      dataApi: { data },
    },
  } = state;

  // let requestParams = `${params}`

  // let { response } = yield call(action, requestParams, body, header)
  // console.log(error)

  if (data.response) {
    // console.log(data)
    // const {
    //   result
    // } = response.data

    // if (field) {
    yield all([
      put(
        actionToProps.changeFormAttribute({
          dataApi: { result: data, responseData: data.response },
        })
      ),
      // put(actionToProps.changeFormAttribute({ key: 'dataApi', value: {result: data, responseData: data.response} })),
    ]);
  } else {
    let msg = "";
    if (data.error.status === 404) {
      msg = "Not Found";
    } else if (data.error.status === 500) {
      msg = "Internal Server Error";
    } else if (data.error.status === 400) {
      if (data.error.data && data.error.data.message) {
        // let { status, statusText } = data.error
        let validationUnique = "validation.unique";
        let validationRequired = "validation.required";
        let validationFile = "validation.file";

        if (typeof data.error.data.message !== "object") {
          msg = data.error.data.message;
        } else {
          msg = [];
          let { message } = data.error.data;
          Object.keys(message).forEach((e, idx) => {
            let messageItem = message[e].join(", ");
            if (message[e][0] === validationRequired) {
              msg.push(`${e} tidak boleh kosong`);
            } else if (message[e][0] === validationUnique) {
              msg.push(`${e} harus unique`);
            } else if (message[e][0] === validationFile) {
              msg.push(`${e} tidak valid`);
            } else {
              msg.push(`${e} ${messageItem}}`);
            }
            // errorMessageItems.push(`${e} : ${messageItem}`)
          });
        }
      }
    }
    yield all([
      put(
        actionToProps.changeFormAttribute({
          loadingForm: false,
          loadingSubmit: false,
          status_response: data.error.status,
          detailUnauthorized: {
            isShown: data.error.status === 401 ? true : false,
            title: "Anda tidak memiliki akses halaman ini!",
          },
          formError: {
            isShown: data.error.status !== 401,
            title: `Error Information - ${data.error.status}`,
            message:
              typeof msg === "string"
                ? msg
                : `<ul><li>${msg.join("</li><li>")}</li></ul>`,
            statusCode: data.error.status,
          },
        })
      ),
      // put(actionToProps.changeFormAttribute({ key: 'formError', value: {
      //   isShown: data.error.status !== 401,
      //   title: `Error Information - ${data.error.status}`,
      //   message: typeof msg === 'string' ? msg : `<ul><li>${msg.join('</li><li>')}</li></ul>`,
      //   statusCode: data.error.status
      // } })),
      // put(actionToProps.changeFormAttribute({ key: 'loadingForm', value: false })),
      // put(actionToProps.changeFormAttribute({ key: 'loadingSubmit', value: false })),
      // put(actionToProps.changeFormAttribute({ key: 'status_response', value: data.error.status })),
      // put(actionToProps.changeFormAttribute({ key: 'detailUnauthorized', value:{ isShown: (data.error.status === 401 ? true : false) ,title: 'Anda tidak memiliki akses halaman ini!'}})),
    ]);
  }
}

function* sagaFetchApiDetail() {
  const state = yield select();

  const {
    form: {
      getApi: { action, params, assignValue, callback },
    },
  } = state;

  let { error, response } = yield call(action, params);

  if (response) {
    const { result } = response.data;
    let dataKey = assignValue ? assignValue.toString() : "data";

    if (callback && typeof callback === "function") yield call(callback);
    yield all([
      put(
        actionToProps.changeFormAttribute({
          loadingSubmit: false,
          loadingForm: false,
          [dataKey]: result,
        })
      ),
      // put(actionToProps.changeFormAttribute({ key: assignValue ? assignValue.toString() : 'data', value: result })),
      // put(actionToProps.changeFormAttribute({ key: 'loadingForm', value: false })),
      // put(actionToProps.changeFormAttribute({ key: 'loadingSubmit', value: false })),
    ]);
  } else {
    let message = "";
    if (error.status === 404) {
      message = "Not Found";
    } else if (error.status === 500) {
      message = "Internal Server Error";
    }
    yield all([
      put(
        actionToProps.changeFormAttribute({
          loadingSubmit: false,
          loadingForm: false,
          detailUnauthorized: {
            isShown: error.status === 401 ? true : false,
            title: "Anda tidak memiliki akses halaman ini!",
          },
          status_response: error.status,
          formError: {
            isShown: error.status !== 401,
            title: `Error Information - ${error.status}`,
            message,
            statusCode: error.status,
          },
        })
      ),
      // put(actionToProps.changeFormAttribute({ key: 'formError', value: {
      //   isShown: error.status !== 401,
      //   title: `Error Information - ${error.status}`,
      //   message,
      //   statusCode: error.status
      // } })),
      // put(actionToProps.changeFormAttribute({ key: 'status_response', value: error.status })),
      // put(actionToProps.changeFormAttribute({ key: 'detailUnauthorized', value:{ isShown: (error.status === 401 ? true : false) ,title: 'Anda tidak memiliki akses halaman ini!'}})),
      // put(actionToProps.changeFormAttribute({ key: 'loadingForm', value: false })),
      // put(actionToProps.changeFormAttribute({ key: 'loadingSubmit', value: false })),
    ]);
  }
}

function* sagaFetchApiSubmit() {
  const state = yield select();

  const {
    form: {
      getApi: { action, params, callback },
      alert,
    },
  } = state;

  let { response, error } = yield call(action, params);

  if (response) {
    // const {
    //   result
    // } = response.data
    if (callback && typeof callback === "function") yield call(callback);
    yield all([
      put(
        actionToProps.changeFormAttribute({
          loadingSubmit: false,
          dataApi: { result: response, responseData: response.data },
          alert: {
            ...alert,
            isShown: true,
          },
          isShown: true,
        })
      ),
      // put(actionToProps.changeFormAttribute({ key: 'loadingSubmit', value: false })),
      // put(actionToProps.changeFormAttribute({ key: 'dataApi', value: {result: response,responseData:response.data} })),
      // // typeof result !== 'object' ? null : put(actionToProps.changeFormAttribute({key: 'data',value: result})),
      // put(actionToProps.changeFormAttribute({
      //   key: 'alert', value: {
      //     ...alert,
      //     isShown: true
      //   }
      // })),
      // put(actionToProps.changeFormAttribute({ key: 'isShown', value: true })),
    ]);
  }

  if (error) {
    const {
      data: { message },
      status,
      statusText,
    } = error;

    if (message) {
      let validationUnique = "validation.unique";
      let validationRequired = "validation.required";
      let validationFile = "validation.file";
      let errormsg = [];
      let errorMessageItems = [`${status} ${statusText}`];

      if (typeof message !== "object") {
        errorMessageItems.push(message);
        errormsg.push(message);
      } else {
        Object.keys(message).forEach((e, idx) => {
          let messageItem = message[e].join(", ");
          if (message[e][0] === validationRequired) {
            errormsg.push(`${e} tidak boleh kosong`);
          } else if (message[e][0] === validationUnique) {
            errormsg.push(`${e} harus unique`);
          } else if (message[e][0] === validationFile) {
            errormsg.push(`${e} tidak valid`);
          } else {
            errormsg.push(`${e} ${messageItem}}`);
          }
          // errorMessageItems.push(`${e} : ${messageItem}`)
        });
      }

      yield all([
        put(
          actionToProps.changeFormAttribute({
            loadingSubmit: false,
            formError: {
              isShown: true,
              title: `Error Information - ${error.status}`,
              message: `<ul><li>${errormsg.join("</li><li>")}</li></ul>`,
              statusCode: error.status,
            },
          })
        ),
        // put(actionToProps.changeFormAttribute({ key: 'loadingSubmit', value: false })),
        // put(actionToProps.changeFormAttribute({ key: 'validationItems', value: message })),
        // put(actionToProps.changeFormAttribute({
        //   key: 'validation', value: {
        //     isShown: true,
        //     variant: 'error',
        //     message: `<ul><li>${errorMessageItems.join('</li><li>')}</li></ul>`
        //   }
        // })),
        // put(actionToProps.changeFormAttribute({ key: 'formError', value: {
        //   isShown: true,
        //   title: `Error Information - ${error.status}`,
        //   message: `<ul><li>${errormsg.join('</li><li>')}</li></ul>`,
        //   statusCode: error.status
        // } })),
      ]);
    } else {
      let msg = "";
      if (error.status === 404) {
        msg = "Not Found";
      } else if (error.status === 500) {
        msg = "Internal Server Error";
      }
      yield all([
        put(
          actionToProps.changeFormAttribute({
            status_response: error.status,
            loadingSubmit: false,
            detailUnauthorized: {
              isShown: error.status === 401 ? true : false,
              title: "Anda tidak memiliki akses halaman ini!",
            },
            formError: {
              isShown: error.status === 500 || error.status === 404,
              title: `Error Information - ${error.status}`,
              message: msg,
              statusCode: error.status,
            },
          })
        ),
        // put(actionToProps.changeFormAttribute({ key: 'formError', value: {
        //   isShown: (error.status === 500) || (error.status === 404),
        //   title: `Error Information - ${error.status}`,
        //   message: msg,
        //   statusCode: error.status
        // } })),
        // put(actionToProps.changeFormAttribute({ key: 'status_response', value: error.status })),
        // put(actionToProps.changeFormAttribute({ key: 'detailUnauthorized', value:{ isShown: (error.status === 401 ? true : false) ,title: 'Anda tidak memiliki akses halaman ini!'}})),
        // put(actionToProps.changeFormAttribute({ key: 'loadingSubmit', value: false })),
      ]);
    }
  }
}

function* sagaFetchApiSelectOptionBarang() {
  const state = yield select();

  const {
    form: {
      getApi: { action, params },
    },
  } = state;

  let { error, response } = yield call(action, params);

  if (response) {
    const { result } = response.data;

    // console.log(result)

    yield all([
      put(
        actionToProps.changeFormAttribute({
          loadingForm: false,
          selectOptionBarang: result.data,
        })
      ),
      // put(actionToProps.changeFormAttribute({ key: 'selectOptionBarang', value: result.data })),
      // put(actionToProps.changeFormAttribute({ key: 'loadingForm', value: false })),
    ]);
  } else {
    let message = "";
    if (error.status === 404) {
      message = "Not Found";
    } else if (error.status === 500) {
      message = "Internal Server Error";
    }
    yield all([
      put(
        actionToProps.changeFormAttribute({
          loadingForm: false,
          formError: {
            isShown: error.status !== 401,
            title: `Error Information - ${error.status}`,
            message,
            statusCode: error.status,
          },
          status_response: error.status,
          detailUnauthorized: {
            isShown: error.status === 401 ? true : false,
            title: "Anda tidak memiliki akses halaman ini!",
          },
        })
      ),
      // put(actionToProps.changeFormAttribute({ key: 'formError', value: {
      //   isShown: error.status !== 401,
      //   title: `Error Information - ${error.status}`,
      //   message,
      //   statusCode: error.status
      // } })),
      // put(actionToProps.changeFormAttribute({ key: 'status_response', value: error.status })),
      // put(actionToProps.changeFormAttribute({ key: 'detailUnauthorized', value:{ isShown: (error.status === 401 ? true : false) ,title: 'Anda tidak memiliki akses halaman ini!'}})),
      // put(actionToProps.changeFormAttribute({ key: 'loadingForm', value: false })),
    ]);
  }
}

export default function* sagas() {
  yield takeLatest(constants.FETCH_API, sagaFetchApi);
  yield takeLatest(constants.FETCH_DATA_API, sagaFetchDataFromApi);
  yield takeLatest(constants.FETCH_DETAIL_API, sagaFetchApiDetail);
  yield takeLatest(constants.FETCH_SUBMIT_API, sagaFetchApiSubmit);
  yield takeLatest(
    constants.FETCH_SELECTOPTIONBARANG_API,
    sagaFetchApiSelectOptionBarang
  );
}

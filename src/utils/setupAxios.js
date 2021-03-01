import { getAuthenticated } from "./auth";
import store from "store";
import { actionToProps } from "store/table/table.actions";
import getErrorMessage from "utils/getErrorMessage";

export function setupAxios(axios) {
  axios.interceptors.request.use(
    (config) => {
      const authToken = getAuthenticated();

      // config.baseURL = process.env.REACT_APP_API_BASE_URL;
      config.baseURL = "";

      if (authToken) {
        config.headers.Authorization = authToken;
      }
      // config.headers.common['Accept'] = 'application/json';

      config.crossDomain = true;
      config.credentials = "same-origin";

      return config;
    },
    (err) => Promise.reject(err)
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      store.dispatch(
        actionToProps.changeTableAttribute({
          tableError: {
            isShown: true,
            message: getErrorMessage(error.response),
            statusCode: error.response.status,
            title: `Error Information - ${error.response.status}`,
          },
        })
      );
      return Promise.reject(error);
    }
  );
}

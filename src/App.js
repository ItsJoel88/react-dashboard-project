import PageRouter from "router/router";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

export default function App({ store }) {
  return (
    <>
      <Provider store={store}>
        <PageRouter />
      </Provider>
    </>
  );
}
App.propTypes = {
  store: PropTypes.any,
  persistor: PropTypes.any,
};

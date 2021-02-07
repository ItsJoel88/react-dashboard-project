import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jsCookie from "js-cookie";
import PropTypes from "prop-types";

/**
 * IMPORT PAGES HERE
 */
import LoginPage from "pages/Login";
import DashboardPage from "pages/Dashboard";

function useAuth() {
  return !!jsCookie.get("authorization");
}

function PrivateRoute({ comp, ...rest }) {
  const auth = useAuth();
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          auth ? comp : <Redirect to={{ pathname: "/login" }} />
        }
      />
    </>
  );
}
PrivateRoute.propTypes = {
  comp: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
};

function PageRouter() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Redirect to={{ pathname: "/dashboard" }} />}
        />
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute comp={DashboardPage} path="/dashboard" />
      </Switch>
    </Router>
  );
}

export default PageRouter;

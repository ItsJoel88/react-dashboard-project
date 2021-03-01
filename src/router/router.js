import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jsCookie from "js-cookie";
import PropTypes from "prop-types";
import getMenus from "utils/getMenus";
import Loading from "components/Loading";
import Menus from "components/Menus";
import Dropdown from "components/Dropdown";
import SearchInput from "components/SearchInput";
import Grid from "@material-ui/core/Grid";

/**
 * IMPORT PAGES HERE
 */
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import Form from "layouts/Form";

function useAuth() {
  return !!jsCookie.get("authorization");
}

function PrivateRoute({ comp, ...rest }) {
  const auth = useAuth();
  const Component = comp;
  const [menuApi, setMenuApi] = React.useState({
    menus: [],
    loading: true,
  });

  React.useEffect(() => {
    if (auth) {
      async function fetchMenus() {
        let data = await getMenus();
        setMenuApi({
          menus: data,
          loading: false,
        });
      }

      fetchMenus();
    }
  }, [auth]);

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return (
            <>
              {auth ? (
                <>
                  <Loading open={menuApi.loading} />
                  <Menus menus={menuApi.menus} />
                  <Component />
                </>
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )}
            </>
          );
        }}
      />
    </>
  );
}
PrivateRoute.propTypes = {
  comp: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
};

function PageRouter() {
  const [menuApi, setMenuApi] = React.useState({
    menus: [],
    loading: true,
  });

  React.useEffect(() => {
    async function fetchMenus() {
      let data = await getMenus();
      setMenuApi({
        menus: data,
        loading: false,
      });
    }

    fetchMenus();
  }, []);
  return (
    <Router basename="/v1">
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Redirect to={{ pathname: "/dashboard" }} />}
        />
        <Route path="/input">
          <Loading open={menuApi.loading} />
          <Menus menus={menuApi.menus} />
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={2}>
              <Dropdown
                options={[{ label: "aa", value: "aa" }]}
                value={""}
                label="Age"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <SearchInput />
            </Grid>
          </Grid>
        </Route>
        <Route path="/login">
          <Loading open={menuApi.loading} />
          <Menus menus={menuApi.menus} />
          <Login />
        </Route>
        <Route path="/form/create">
          <Loading open={menuApi.loading} />
          <Menus menus={menuApi.menus} />
          <Form />
        </Route>
        <Route path="/form/edit">
          <Loading open={menuApi.loading} />
          <Menus menus={menuApi.menus} />
          <Form create={false} editCondition={true} />
        </Route>
        <PrivateRoute comp={Dashboard} path="/dashboard" />
      </Switch>
    </Router>
  );
}

export default PageRouter;

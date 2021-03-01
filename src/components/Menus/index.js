import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";

// core components
import Grid from "@material-ui/core/Grid";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
import CustomDropdown from "components/CustomDropdown/";
import CustomButton from "components/CustomButtons/Button.js";

import styles from "assets/jss/navbarStyle";

const useStyles = makeStyles(styles);

function RightLinks(props) {
  const classes = useStyles();
  const { menus, history } = props;
  return (
    <List className={classes.list}>
      {menus &&
        menus.map((menu, idx) => {
          if (menu.children) {
            if (menu.children.length < 1) {
              return (
                <ListItem className={classes.listItem} key={idx}>
                  <CustomButton
                    className={classes.navLink}
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(menu.path);
                    }}
                    color="transparent"
                  >
                    {menu.name}
                  </CustomButton>
                </ListItem>
              );
            } else {
              return (
                <ListItem className={classes.listItem} key={idx}>
                  <CustomDropdown
                    hoverColor="primary"
                    placement={"left-start"}
                    buttonText={menu.name}
                    buttonProps={{
                      className: classes.navLink,
                      color: "transparent",
                    }}
                    dropdownList={
                      [
                        // <CustomDropdown
                        //   onClick={() => {
                        //     document.body.click();
                        //   }}
                        //   hoverColor="primary"
                        //   key={0}
                        //   placement={"right-start"}
                        //   buttonText="test"
                        //   buttonProps={{
                        //     className: classes.navLink + " custom-dropdown-btn",
                        //     color: "transparent",
                        //   }}
                        //   popperProps={{
                        //     className: "custom-dropdown",
                        //   }}
                        //   dropdownList={["abcdefghijklmnop", "blblblbl", "blblblbl"]}
                        // />,
                      ]
                    }
                  />
                </ListItem>
              );
            }
          } else {
            return (
              <ListItem className={classes.listItem} key={idx}>
                <CustomButton
                  className={classes.navLink}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(menu.path);
                  }}
                  color="transparent"
                >
                  {menu.name}
                </CustomButton>
              </ListItem>
            );
          }
        })}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          hoverColor="primary"
          placement={"left-start"}
          buttonText="Dropdown"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          dropdownList={[
            <CustomDropdown
              onClick={() => {
                document.body.click();
              }}
              hoverColor="primary"
              key={0}
              placement={"right-start"}
              buttonText="test"
              buttonProps={{
                className: classes.navLink + " custom-dropdown-btn",
                color: "transparent",
              }}
              popperProps={{
                className: "custom-dropdown",
              }}
              dropdownList={["abcdefghijklmnop", "blblblbl", "blblblbl"]}
            />,
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            "Separated link",
            { divider: true },
            "One more separated link",
          ]}
        />
      </ListItem>
    </List>
  );
}

RightLinks.propTypes = {
  menus: PropTypes.array,
  history: PropTypes.object,
};

function Menus(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { leftLinks, menus, history } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes["primary"]]: "primary",
  });
  const brandComponent = <Button className={classes.title}>Superagen</Button>;

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <AppBar className={appBarClasses}>
          <Toolbar className={classes.container}>
            {leftLinks !== undefined ? brandComponent : null}
            <div className={classes.flex}>
              {leftLinks !== undefined ? (
                <Hidden smDown implementation="css">
                  {leftLinks}
                </Hidden>
              ) : (
                brandComponent
              )}
            </div>
            <Hidden smDown implementation="css">
              <RightLinks menus={menus} history={history} />
            </Hidden>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
          <Hidden mdUp implementation="js">
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={handleDrawerToggle}
            >
              <div className={classes.appResponsive}>
                <RightLinks menus={menus} history={history} />
              </div>
            </Drawer>
          </Hidden>
        </AppBar>
      </Grid>
    </Grid>
  );
}

Menus.defaultProp = {
  color: "white",
};

Menus.propTypes = {
  menus: PropTypes.array,
  history: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};

export default withRouter(Menus);

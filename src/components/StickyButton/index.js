// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

// API

// Components UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -20,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[300],
      contrastText: "#fff",
    },
  },
});

class StickyButton extends Component {
  render() {
    const {
      classes,
      create,
      onSave,
      onCancel,
      onBack,
      onEdit,
      disabled,
      btnCancelText,
      btnCreateText,
      btnBackText,
      btnEditText,
      editCondition,
      hideEdit,
    } = this.props;
    return (
      <>
        <AppBar position="fixed" color="transparent" className={classes.appBar}>
          <Toolbar>
            {!create && editCondition ? (
              <Button
                disabled={disabled}
                className={classes.button}
                size="small"
                color="secondary"
                variant="contained"
                onClick={onCancel}
              >
                {btnCancelText}
              </Button>
            ) : (
              <Button
                startIcon={
                  <KeyboardBackspaceIcon className={classes.extendedIcon} />
                }
                disabled={disabled}
                className={classes.button}
                size="small"
                color="secondary"
                variant="contained"
                onClick={onBack}
              >
                {btnBackText}
              </Button>
            )}
            {!create && editCondition && (
              <Fab
                disabled={disabled}
                size="medium"
                color="primary"
                aria-label="add"
                className={classes.fabButton}
                variant="extended"
                onClick={onBack}
              >
                {/* <Typography variant="subtitle2">Back</Typography> */}
                <KeyboardBackspaceIcon className={classes.extendedIcon} />
                {btnBackText}
              </Fab>
            )}
            <div className={classes.grow} />
            <ThemeProvider theme={theme}>
              {(create || (!create && editCondition)) && (
                <Button
                  disabled={disabled}
                  className={classes.button}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={onSave}
                >
                  {btnCreateText}
                </Button>
              )}
              {!create && !editCondition && !hideEdit && (
                <Button
                  disabled={disabled}
                  className={classes.button}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={onEdit}
                >
                  {btnEditText}
                </Button>
              )}
            </ThemeProvider>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

StickyButton.defaultProps = {
  btnCreateText: "Create",
  btnCancelText: "Cancel",
  btnEditText: "Edit Detail",
  btnBackText: "Back",
  disabled: false,
};

StickyButton.propTypes = {
  classes: PropTypes.object,
  create: PropTypes.bool,
  editCondition: PropTypes.bool,
  disabled: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onEdit: PropTypes.func,
  onBack: PropTypes.func,
  btnCreateText: PropTypes.string,
  btnCancelText: PropTypes.string,
  btnEditText: PropTypes.string,
  btnBackText: PropTypes.string,
  hideEdit: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(StickyButton);

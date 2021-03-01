// Core
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// Components UI
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Loading({ open }) {
  const classes = useStyles();
  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" size="4rem" />
      </Backdrop>
    </>
  );
}

Loading.defaultProps = {
  open: false,
};

Loading.propTypes = {
  open: PropTypes.bool.isRequired,
};

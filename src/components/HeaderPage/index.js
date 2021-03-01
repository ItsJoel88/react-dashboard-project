// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// API

// Components UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  title: {
    margin: theme.spacing(3),
    textAlign: "left",
    textTransform: "uppercase",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  subtitle: {
    fontSize: "12px",
    color: "gray",
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "block",
      paddingLeft: 0,
    },
  },
});

class Form extends Component {
  render() {
    const { classes, title, subtitle } = this.props;
    return (
      <>
        <Grid container>
          <Grid item xs={12} sm={12} md={2} className={classes.title}>
            <Typography variant="h6">
              {title}
              <span className={classes.subtitle}>{subtitle}</span>
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(Form);

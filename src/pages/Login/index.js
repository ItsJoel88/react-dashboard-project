// Core
import React from "react";
import PropTypes from "prop-types";
// import jsCookie from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";
import imageLogo from "assets/images/logo.png";
import image from "assets/images/banner.jpg";

// Components UI
// import Modal from "components/Modal";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.username = React.createRef();
    this.password = React.createRef;
  }
  render() {
    console.log(process.env)
    const { classes, history } = this.props;
    return (
      <>
        {/* <Modal
          maxWidth="xs"
          open={true}
          type="error"
          onClose={(e) => {
            return e;
          }}
        >
          <>
            <h1>Hello World</h1>
            <h2>World Hello</h2>
          </>
        </Modal> */}
        <div className="container-login" style={{background: `url(${image})`}}>
          <Card className="form-login">
            <form onSubmit={async (e) => {
              e.preventDefault();
              // let resp = await axios.get("https://jsonplaceholder.typicode.com/posts/abcdef")
              let resp = await axios.get(
                "http://dev.superagen.id/api/v3/agent/list"
              );
              console.log("THIS IS RESPONSE", resp);
              // jsCookie.set("authorization","nuel")
              // history.push("/dashboard")
            }}>
              <img className={classes.center} alt="logo" src={imageLogo} width="100" />
              <br />
              <Grid container justify="center">
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    className="input-login"
                    ref={this.username}
                    id="input-with-icon-grid-username"
                    label="Username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    className="input-login"
                    ref={this.password}
                    id="input-with-icon-grid-pass"
                    label="Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};

// connect()(withRouter(FirstPage))(withStyles(styles)(FirstPage))
export default withStyles(styles, { withTheme: true })(withRouter(Login));

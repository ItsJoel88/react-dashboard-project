// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Components UI
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    margin: "10px",
    minWidth: "80%",
  },
  dropdown: {
    minWidth: "80%",
  },
  label: {
    marginBottom: "3px",
  },
};

class Dropdown extends Component {
  render() {
    const {
      value,
      label,
      onChange,
      customOptionLabel,
      customOptionValue,
      inputProps,
      disabled,
      native,
      options,
      classes,
    } = this.props;
    return (
      <>
        {/* <FormControl variant="outlined" className={classes.dropdown}> */}
        <div className={classes.root}>
          <InputLabel className={classes.label} htmlFor="age-native-simple">
            {label}
          </InputLabel>
          <TextField
            className={classes.dropdown}
            variant="outlined"
            select
            labelId="age-native-simple"
            native={native}
            value={value}
            onChange={onChange}
            {...inputProps}
            disabled={disabled}
            label={""}
            size="small"
          >
            {options &&
              options.map((itm, idx) => {
                return (
                  <option key={idx} value={customOptionValue(itm)}>
                    {customOptionLabel(itm)}
                  </option>
                );
              })}
          </TextField>
        </div>
        {/* </FormControl> */}
      </>
    );
  }
}

Dropdown.defaultProps = {
  value: "",
  onChange: () => {},
  options: [],
  native: true,
  customOptionLabel: (itm) => itm.label,
  customOptionValue: (itm) => itm.value,
  label: "",
  inputProps: {},
  disabled: false,
  classes: {},
};

Dropdown.propTypes = {
  classes: PropTypes.object,
  inputProps: PropTypes.object,
  disabled: PropTypes.bool,
  native: PropTypes.bool,
  onChange: PropTypes.func,
  customOptionLabel: PropTypes.func,
  customOptionValue: PropTypes.func,
  value: PropTypes.any,
  options: PropTypes.array,
  label: PropTypes.string,
};

export default withStyles(styles)(Dropdown);

// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Components UI
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";

const styles = {
  search: {
    margin: "10px",
    padding: "0",
  },
  label: {
    marginBottom: "3px",
  }
};

class SearchInput extends Component {
  render() {
    const {
      placeholder,
      defaultValue,
      onChange,
      onSearch,
      classes,
      label,
      inputProps,
    } = this.props;
    return (
      <>
        <div className={classes.search}>
          <InputLabel
            className={classes.label}
            htmlFor="input-with-icon-adornment"
          >
            {label}
          </InputLabel>
          <TextField
            id="input-with-icon-adornment"
            placeholder={placeholder}
            defaultValue={defaultValue}
            size="small"
            variant="outlined"
            onChange={onChange}
            {...inputProps}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={onSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </>
    );
  }
}

SearchInput.defaultProps = {
  placeholder: "",
  defaultValue: "",
  onSearch: () => {},
  onChange: () => {},
  label: "Search",
  inputProps: {},
};

SearchInput.propTypes = {
  defaultValue: PropTypes.string,
  classes: PropTypes.object,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.string,
  inputProps: PropTypes.object,
};

export default withStyles(styles)(SearchInput);

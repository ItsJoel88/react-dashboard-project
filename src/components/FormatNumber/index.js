// Core
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components UI

class FormatNumber extends Component {
  render() {
    const {
      value,
      prefix,
      style,
      className,
      thousandSeparator,
      minimumFractionDigits,
      maximumFractionDigits,
    } = this.props;
    return (
      <>
        <span
          className={`number-format ${className || ""}`}
          style={{ ...style }}
        >
          {prefix}&nbsp;
          {thousandSeparator === "."
            ? Number(value).toLocaleString("de-DE", {
                minimumFractionDigits,
                maximumFractionDigits,
              })
            : Number(value).toLocaleString(undefined, {
                minimumFractionDigits,
                maximumFractionDigits,
              })}
        </span>
      </>
    );
  }
}

FormatNumber.defaultProps = {
  prefix: "Rp.",
  style: {},
  className: "",
  thousandSeparator: ".",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

FormatNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  prefix: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  thousandSeparator: PropTypes.oneOf([".", ","]),
  minimumFractionDigits: PropTypes.number,
  maximumFractionDigits: PropTypes.number,
};

export default FormatNumber;

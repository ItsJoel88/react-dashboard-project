// Core
import React, { Component } from "react";
import PropTypes from "prop-types";

// API

// Components UI
import HeaderPage from "components/HeaderPage";
import StickyButton from "components/StickyButton";

class Form extends Component {
  render() {
    const { create, onSave, onBack, onCancel, editCondition } = this.props;
    return (
      <>
        <HeaderPage title="Penjualan" subtitle="P-202102" />
        {this.props.children}
        <StickyButton
          create={create}
          onSave={onSave}
          onBack={onBack}
          onCancel={onCancel}
          editCondition={editCondition}
        />
      </>
    );
  }
}

Form.defaultProps = {
  create: true,
  editCondition: false,
  btnCreateText: "Create",
  btnCancelText: "Cancel",
  btnEditText: "Edit Detail",
  btnBackText: "Back",
  disabled: false,
};

Form.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any,
  create: PropTypes.bool,
  onSave: PropTypes.func,
  onBack: PropTypes.func,
  onCancel: PropTypes.func,
  editCondition: PropTypes.bool,
  disabled: PropTypes.bool,
  onEdit: PropTypes.func,
  btnCreateText: PropTypes.string,
  btnCancelText: PropTypes.string,
  btnEditText: PropTypes.string,
  btnBackText: PropTypes.string,
  hideEdit: PropTypes.bool,
};

export default Form;

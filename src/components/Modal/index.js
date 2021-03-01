// Core
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

// Components UI
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
// import Backdrop from "@material-ui/core/Backdrop";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
  modal: {
    fontSize: "14px",
    backgroundColor: "#217dd8",
    color: "#fff",
    fontWeight: "bold",
  },
}));

function ModalApi(props) {
  const { type, onClose } = props;
  return (
    <>
      <div className="modal-information">
        <div className="modal-icon">
          {type === "error" ? (
            <ReportProblemIcon color="secondary" fontSize="inherit" />
          ) : (
            <CheckCircleOutlineIcon
              fontSize="inherit"
              style={{ color: green[500] }}
            />
          )}
        </div>
        <div className="dialog-button nopadding">
          <Button
            className="close-btn btn-modal-fullwidth"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            Dismiss
          </Button>
        </div>
      </div>
    </>
  );
}

ModalApi.propTypes = {
  onClose: PropTypes.func,
  type: PropTypes.oneOf(["error", "success"]),
};

export default function Modal(props) {
  const classes = useStyles();
  const {
    open,
    onClose,
    onSubmit,
    type,
    title,
    children,
    fullWidth,
    maxWidth,
  } = props;
  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {type !== "submit" ? (
          <ModalApi onClose={onClose} type={type} />
        ) : (
          <DialogTitle className={classes.modal}>{title}</DialogTitle>
        )}
        {type === "submit" && (
          <>
            <DialogContent>{children}</DialogContent>
            <div className="dialog-button">
              <Button
                className="close-btn btn-modal"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Cancel
              </Button>
              {type === "submit" && (
                <Button
                  className="submit-btn btn-modal"
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                >
                  Submit
                </Button>
              )}
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}

Modal.defaultProps = {
  fullWidth: true,
  maxWidth: "sm",
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.oneOf(["error", "success", "submit"]).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
};

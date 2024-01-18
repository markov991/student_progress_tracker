import React from "react";
import * as classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div onClick={onClose} className={classes.backdrop}></div>;
};

const Modal = ({ onClose, children }) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className={classes.modal}>{children}</div>
    </>
  );
};

export default Modal;

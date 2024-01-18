import React from "react";
import * as classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div onClick={onClose} className={classes.backdrop}></div>;
};
const ModalWraper = ({ children }) => {
  return <div className={classes.wraper}>{children}</div>;
};

const Modal = ({ onClose, children }) => {
  return (
    <ModalWraper>
      <Backdrop onClose={onClose} />
      <div className={classes.modal}>{children}</div>
    </ModalWraper>
  );
};

export default Modal;

import React from "react";
import * as classes from "./StudentCard.module.css";

const StudentCard = ({ children }) => {
  return <div className={classes.studentCardBox}>{children}</div>;
};

export default StudentCard;

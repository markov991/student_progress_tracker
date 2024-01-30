import React from "react";
import * as classes from "./MainBox.module.css";

const MainBox = ({ children }) => {
  return <div className={classes.main_box}>{children}</div>;
};

export default MainBox;

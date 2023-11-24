import React from "react";
import * as classes from "./SideBar.module.css";

const SideBar = (props) => {
  return <div className={classes.side_bar}>{props.children}</div>;
};

export default SideBar;

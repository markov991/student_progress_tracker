import React from "react";
import * as classes from "./LoadingSpiner.module.css";

const LoadingSpiner = () => {
  return (
    <div className={classes.centerBox}>
      <div className={classes.spinner}></div>;
    </div>
  );
};

export default LoadingSpiner;

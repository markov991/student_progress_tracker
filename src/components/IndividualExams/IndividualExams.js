import React from "react";
import * as classes from "./IndividualExams.module.css";

const IndividualExams = ({ examName, examScore }) => {
  return (
    <div
      className={`${classes.examBox} ${
        examScore > 79
          ? `${classes.betterResult}`
          : `${examScore < 40 ? `${classes.badResult}` : ""}`
      }`}
    >
      <div className={classes.examName}>{examName}</div>
      <div className={classes.examScore}>{examScore}</div>
    </div>
  );
};

export default IndividualExams;

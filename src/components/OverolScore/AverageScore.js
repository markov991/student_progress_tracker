import React from "react";
import * as classes from "./AverageScore.module.css";

const OverolScore = ({ examScores }) => {
  console.log(examScores);
  const avgScore =
    examScores.reduce((accumulator, score) => {
      return accumulator + +score.examScore;
    }, 0) / examScores.length;
  return (
    <div className={classes.overolBox}>
      <div
        className={`${
          avgScore > 79
            ? `${classes.betterResult}`
            : `${
                avgScore < 40
                  ? `${classes.badResult}`
                  : `${classes.defaultResult}`
              }`
        }`}
      >
        <div className={classes.nameAvg}>Average</div>
        <div className={classes.avgScore}>
          {examScores.length > 0 && avgScore}
        </div>
      </div>
    </div>
  );
};

export default OverolScore;

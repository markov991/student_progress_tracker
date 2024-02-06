import React from "react";

const OverolScore = ({ examScores }) => {
  console.log(examScores);
  const x = examScores.reduce((accumulator, score) => {
    return accumulator + +score.examScore;
  }, 0);
  return (
    <div>
      <div>Overol</div>
      <div>{examScores.length > 0 && x / examScores.length}</div>
    </div>
  );
};

export default OverolScore;

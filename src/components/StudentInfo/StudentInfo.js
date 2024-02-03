import React from "react";
import * as classes from "./StudentInfo.module.css";
import trashCan from "../../images/delete.png";
import addIcon from "../../images/add.png";
import openIcon from "../../images/search.png";

const StudentInfo = ({
  children,
  firstName,
  lastName,
  studentId,
  onDelete,
}) => {
  return (
    <>
      <div className={classes.studentGeneralInfo}>
        <span>{`${firstName} ${lastName}`}</span>
        <span>{studentId}</span>
      </div>
      <div>{children}</div>
      <div>
        <div className={classes.IconBox}>
          <img src={addIcon} alt="Trash can" />
          <img onClick={onDelete} src={trashCan} alt="Trash can" />
          <img src={openIcon} alt="mag glass" />
        </div>
      </div>
    </>
  );
};

export default StudentInfo;

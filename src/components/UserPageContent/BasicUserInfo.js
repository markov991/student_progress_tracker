import React from "react";
import * as classes from "./BasicUserInfo.module.css";

const BasicUserInfo = (props) => {
  const { name, userType, faculty, university } = props.user;

  return (
    <div className={classes.basic_user_info}>
      <div className={classes.center_underline}>
        <h2>{name}</h2>
        <div className={classes.facilty_info}>
          <span>{userType}</span>
          <span>{faculty}</span>
          <span>{university}</span>
        </div>
      </div>
    </div>
  );
};

export default BasicUserInfo;

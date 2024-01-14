import React from "react";
import { useSelector } from "react-redux";

import SideBar from "../UI/SideBar";
import MainBox from "../UI/MainBox";
import BasicUserInfo from "./BasicUserInfo";

const UserPageContent = (props) => {
  const user = useSelector((state) => state.userInfo);
  // console.log(user);

  return (
    <>
      <SideBar>
        <BasicUserInfo
          user={{
            name: user.userInfo.name,
            userType: user.userType,
            faculty: user.userInfo.faculty,
            university: user.userInfo.university,
          }}
        />
        <button>Add exam</button>
      </SideBar>
      <MainBox />
    </>
  );
};

export default UserPageContent;

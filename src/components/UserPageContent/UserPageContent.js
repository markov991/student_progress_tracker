import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import * as classes from "./UserPageContent.module.css";

import SideBar from "../UI/SideBar";
import MainBox from "../UI/MainBox";
import BasicUserInfo from "./BasicUserInfo";
import Modal from "../UI/Modal";
import AddCourseForm from "../Forms/addCourseForm";

const UserPageContent = (props) => {
  const user = useSelector((state) => state.userInfo);

  const [showModal, setShowMOdal] = useState(false);
  const closeModalHandler = (e) => {
    e.preventDefault();
    setShowMOdal(false);
  };

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
        <div className={classes.button_box_wraper}>
          <button onClick={() => setShowMOdal(true)}>Add course</button>
          <button>Add student</button>
        </div>
      </SideBar>
      <MainBox />

      {showModal &&
        createPortal(
          <Modal onClose={closeModalHandler}>
            <AddCourseForm onClose={closeModalHandler} />
            {/* <button onClick={closeModalHandler}>Close</button> */}
          </Modal>,
          document.body
          // document.getElementById("___gatsby")
        )}
    </>
  );
};

export default UserPageContent;

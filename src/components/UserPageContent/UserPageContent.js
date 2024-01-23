import React from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import * as classes from "./UserPageContent.module.css";

import SideBar from "../UI/SideBar";
import MainBox from "../UI/MainBox";
import BasicUserInfo from "./BasicUserInfo";
import Modal from "../UI/Modal";
import AddCourseForm from "../Forms/addCourseForm";

const UserPageContent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const showModal = useSelector((state) => state.ui.modalIsOpen);
  console.log(showModal);

  // const [showModal, setShowMOdal] = useState(false);
  const closeModalHandler = (e) => {
    e.preventDefault();
    dispatch(uiActions.setIsOpen({ modalIsOpen: false }));
    // setShowMOdal(false);
  };
  const openModalHandler = (e) => {
    e.preventDefault();
    dispatch(uiActions.setIsOpen({ modalIsOpen: true }));
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
          <button onClick={openModalHandler}>Add course</button>
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

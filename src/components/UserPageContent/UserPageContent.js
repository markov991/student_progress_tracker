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
import AddStudentForm from "../Forms/AddStudentForm";

const UserPageContent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const showModal = useSelector((state) => state.ui.modalIsOpen);
  const modalType = useSelector((state) => state.ui.modalType);
  console.log(showModal, modalType);

  // const [showModal, setShowMOdal] = useState(false);
  const closeModalHandler = (e) => {
    e.preventDefault();
    dispatch(
      uiActions.setIsOpen({
        modalIsOpen: false,
        modalIsAddCourse: false,
        modalIsAddStudent: false,
      })
    );
    // setShowMOdal(false);
  };
  const openAddCourseModalHandler = (e) => {
    e.preventDefault();
    dispatch(
      uiActions.setIsOpen({
        modalIsOpen: true,
        modalIsAddCourse: true,
        modalIsAddStudent: false,
      })
    );
  };
  const openAddStudentModalHandler = (e) => {
    e.preventDefault();

    if (user.userCourses.length === 0) {
      alert("no courses found please add course first");
      return;
    }
    dispatch(
      uiActions.setIsOpen({
        modalIsOpen: true,
        modalIsAddCourse: false,
        modalIsAddStudent: true,
      })
    );
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
          <button onClick={openAddCourseModalHandler}>Add course</button>
          <button onClick={openAddStudentModalHandler}>Add student</button>
        </div>
      </SideBar>
      <MainBox />

      {showModal &&
        createPortal(
          <Modal onClose={closeModalHandler}>
            {modalType.modalIsAddCourse && (
              <AddCourseForm onClose={closeModalHandler} />
            )}
            {modalType.modalIsAddStudent && (
              <AddStudentForm onClose={closeModalHandler} />
            )}
            {/* <button onClick={closeModalHandler}>Close</button> */}
          </Modal>,
          document.body
          // document.getElementById("___gatsby")
        )}
    </>
  );
};

export default UserPageContent;

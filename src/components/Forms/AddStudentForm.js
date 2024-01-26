import React, { useRef } from "react";
import * as classes from "./AddStudentForm.module.css";
import { useSelector } from "react-redux";

const AddStudentForm = ({ onClose }) => {
  const courseOptions = useSelector((state) => state.userInfo.userCourses);
  const courseObject = useRef();
  const studentId = useRef();
  const addStudentHandler = (e) => {
    e.preventDefault();
    if (courseObject) {
      console.log(courseObject.current.value);
    }
  };
  return (
    <>
      <form className={classes.addStudentModalLayout}>
        <div>
          <label htmlFor="firstname">First name</label>
          <input id="firstname" placeholder="Please enter student first name" />
          <label htmlFor="lastname">Last name</label>
          <input id="lastname" placeholder="Please enter student last name" />
        </div>

        {/* <div>
          </div> */}
        <div>
          <label htmlFor="studentId">Student ID</label>
          <input
            id="sutdentId"
            placeholder="Please enter student id"
            ref={studentId}
          />
          <label htmlFor="selectedCourse">Chouse course</label>
          <select id="selectedCourse" ref={courseObject}>
            {courseOptions.map((course) => (
              <option value={course.id} key={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        {/* <div></div> */}
        <div className={classes.buttons}>
          <button onClick={addStudentHandler}>Add</button>
          <button onClick={onClose}>Close</button>
        </div>
      </form>
    </>
  );
};

export default AddStudentForm;

import React, { useRef, useState } from "react";
import * as classes from "./AddStudentForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addingStudentToCourse } from "../../store/userInfoActions";

const AddStudentForm = ({ onClose }) => {
  const courseOptions = useSelector((state) => state.userInfo.userCourses);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const studentFirstName = useRef();
  const studentLastName = useRef();

  const selectedCourse = useRef();
  const studentId = useRef();
  const addStudentHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (selectedCourse) {
      dispatch(
        addingStudentToCourse(userId, selectedCourse.current.value, {
          studentFirstName: studentFirstName.current.value,
          studentLastName: studentLastName.current.value,
          studentId: studentId.current.value,
        })
      );
      console.log(selectedCourse.current.value);
    }
  };
  return (
    <>
      {!isLoading && (
        <form
          onSubmit={addStudentHandler}
          className={classes.addStudentModalLayout}
        >
          <div>
            <label htmlFor="firstname">First name</label>
            <input
              ref={studentFirstName}
              id="firstname"
              placeholder="Please enter student first name"
            />
            <label htmlFor="lastname">Last name</label>
            <input
              ref={studentLastName}
              id="lastname"
              placeholder="Please enter student last name"
            />
          </div>

          <div>
            <label htmlFor="studentId">Student ID</label>
            <input
              id="sutdentId"
              placeholder="Please enter student id"
              ref={studentId}
            />
            <label htmlFor="selectedCourse">Chouse course</label>
            <select id="selectedCourse" ref={selectedCourse}>
              {courseOptions.map((course) => (
                <option value={course.id} key={course.id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className={classes.buttons}>
            <button type="submit">Add</button>
            <button onClick={onClose}>Close</button>
          </div>
        </form>
      )}
      {isLoading && <h1>Loading...</h1>}
    </>
  );
};

export default AddStudentForm;

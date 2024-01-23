import React, { useRef, useState } from "react";
import * as classes from "./AddCourseForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addingCourseToUser } from "../../store/userInfoActions";

const AddCourseForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [isLoading, setIsLoading] = useState(false);
  const courseName = useRef();
  const courseYear = useRef();
  const addCourseHandle = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      courseName: courseName.current.value,
      courseYear: courseYear.current.value,
    };
    dispatch(addingCourseToUser(userId, data));

    console.log(courseName.current.value, courseYear.current.value);
  };
  return (
    <>
      {!isLoading && (
        <form className={classes.course_modal}>
          <div>
            <div className={classes.course_modal}>
              <label htmlFor="courseName">Course name</label>
              <input
                ref={courseName}
                type="text"
                placeholder="Please enter course name"
                id="courseName"
              />
              <label htmlFor="courseYear">Course year</label>
              <select name="year" id="courseYear" ref={courseYear}>
                <option>Please select course year</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>
            <div className={classes.button_box}>
              <button onClick={addCourseHandle}>Add</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </form>
      )}
      {isLoading && <h1>Loading</h1>}
    </>
  );
};

export default AddCourseForm;

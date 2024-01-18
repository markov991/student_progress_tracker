import React from "react";
import * as classes from "./AddCourseForm.module.css";

const AddCourseForm = ({ onClose }) => {
  return (
    <form className={classes.course_modal}>
      <div>
        <div className={classes.course_modal}>
          <label htmlFor="courseName">Course name</label>
          <input
            type="text"
            placeholder="Please enter course name"
            id="courseName"
          />
          <label htmlFor="courseYear">Course year</label>
          <select name="year" id="courseYear">
            <option>Please select course year</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </div>
        <div className={classes.button_box}>
          <button>Add</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </form>
  );
};

export default AddCourseForm;

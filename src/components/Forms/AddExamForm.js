import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addingExamToStudent } from "../../store/userInfoActions";
import * as classes from "./AddExamForm.module.css";

const AddExamForm = ({ onClose, studentInfo, courseName, courseId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const courseChapter = useRef();
  const examScore = useRef();

  const addExamHandler = (e) => {
    e.preventDefault();
    const examInfo = {
      examScore: examScore.current.value,
      examName: courseChapter.current.value,
    };
    dispatch(addingExamToStudent(userId, courseId, studentInfo.id, examInfo));
  };
  return (
    <form onSubmit={addExamHandler} className={classes.addExamModalLayout}>
      <div className={classes.addExamStudentInfo}>
        <span>Student name: </span>
        <span>{studentInfo.studentName}</span>
        <span>StudentId: </span>
        <span>{studentInfo.studentId}</span>
        <span>Course:</span>
        <span>{courseName}</span>
      </div>
      <div className={classes.examInfoBox}>
        <div className={classes.courseChapterBox}>
          <label htmlFor="courseChapter">Curse chapter</label>
          <input ref={courseChapter} type="text" id="courseChapter" />
        </div>
        <div className={classes.scoreBox}>
          <label htmlFor="score">Score: </label>
          <input ref={examScore} id="score" max={100} min={0} type="number" />
        </div>
      </div>
      <div className={classes.addExamBtns}>
        <button type="submit">Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </form>
  );
};

export default AddExamForm;

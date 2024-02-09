import React, { useState } from "react";
import deleteImg from "../../images/delete.png";
import { useSelector, useDispatch } from "react-redux";
import * as classes from "./StudentInfoModal.module.css";
import { removingExamFromDatabase } from "../../store/userInfoActions";

const StudentInfoModal = ({ studentInfo, courseName, courseId, onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [activeExam, setActiveExam] = useState("");
  const deleteExamHandeler = (examId) => {
    dispatch(
      removingExamFromDatabase(userId, courseId, studentInfo.id, examId)
    );
  };

  return (
    <div className={classes.studentInfoModalLayoyt}>
      <div className={classes.studentInfoSection}>
        <span>Student name: </span>
        <span>{`${studentInfo.studentFirstName} ${studentInfo.studentLastName}`}</span>
        <span>StudentId: </span>
        <span>{studentInfo.studentId}</span>
        <span>Course:</span>
        <span>{courseName}</span>
      </div>
      <div className={classes.examsBox}>
        <h2>Exams</h2>
        <div className={classes.examListBox}>
          {studentInfo.exams.map((exam) => (
            <div
              key={exam.id}
              onMouseEnter={() => setActiveExam(exam.id)}
              onMouseLeave={() => setActiveExam("")}
              className={`${
                exam.examScore > 79
                  ? `${classes.betterResult}`
                  : `${
                      exam.examScore < 40
                        ? `${classes.badResult}`
                        : `${classes.defaultResult}`
                    }`
              } `}
            >
              <span className={classes.examName}>{exam.examName}</span>
              <span className={classes.examScore}>{exam.examScore}</span>
              {activeExam === exam.id && (
                <img
                  src={deleteImg}
                  className={classes.deleteExamIcon}
                  onClick={() => deleteExamHandeler(exam.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.buttonBox}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default StudentInfoModal;

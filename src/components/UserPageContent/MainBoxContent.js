import React, { useState } from "react";
import { createPortal } from "react-dom";
import * as classes from "./MainBoxContent.module.css";
import { useSelector, useDispatch } from "react-redux";
import StudentCard from "../UI/StudentCard";
import StudentInfo from "../StudentInfo/StudentInfo";
import AddExamForm from "../Forms/AddExamForm";

import { removingStudentFromCourse } from "../../store/userInfoActions";
import Modal from "../UI/Modal";
import IndividualExams from "../IndividualExams/IndividualExams";
import OverolScore from "../OverolScore/OverolScore";

const MainBoxContent = () => {
  const dispatch = useDispatch();
  const userCourses = useSelector((state) => state.userInfo.userCourses);
  const [showModal, setShomModal] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([...userCourses]);
  const [activefilter, setActiveFilter] = useState("all");
  const [activeStudent, setActiveStudent] = useState({});
  const userId = useSelector((state) => state.auth.userId);
  const deleteStudentHandler = (student) => {
    console.log(student);
    const { studentId, courseId } = student;

    dispatch(removingStudentFromCourse(userId, courseId, studentId));
  };
  const addExamModalHandler = (student) => {
    const { studentInfo, courseId, courseName } = student;
    console.log(studentInfo, courseId, courseName);
    setShomModal(true);
    setActiveStudent({ ...student });
    console.log(activeStudent);
  };
  const filterCoursesHandler = (courseId) => {
    setFilteredCourses(
      userCourses.filter((course) => course.id === courseId.idC)
    );
    setActiveFilter(courseId.idC);
    console.log(courseId);
  };
  const showAllHandler = () => {
    setFilteredCourses([...userCourses]);
    setActiveFilter("all");
  };
  const closeModalHandler = () => {
    setShomModal(false);
  };

  return (
    <>
      <div className={`${classes.filterCoursesBox}`}>
        <button
          className={activefilter === "all" ? classes.activeButton : ""}
          onClick={showAllHandler}
        >
          All
        </button>
        {userCourses.map((course) => (
          <button
            className={activefilter === course.id ? classes.activeButton : ""}
            onClick={() => filterCoursesHandler({ idC: course.id })}
            key={course.id}
          >
            {course.courseName}
          </button>
        ))}
      </div>
      <div className={classes.filterCoursesList}>
        {/* <div className={student}></div> */}
        {filteredCourses.map((course) => (
          <div key={course.id}>
            <div className={classes.courseName}>
              <h1>{course.courseName}</h1>
            </div>
            <div className={classes.studentInfoDescription}>
              <div>
                <span>Student name</span>
                <span>Student id</span>
              </div>
              <span>Exams</span>
              <span>Add exam/Remove student</span>
            </div>
            <div>
              {course.students &&
                course.students.map((student) => (
                  <StudentCard key={student.id}>
                    <StudentInfo
                      onDelete={() =>
                        deleteStudentHandler({
                          studentId: student.id,
                          courseId: course.id,
                        })
                      }
                      onAddExam={() =>
                        addExamModalHandler({
                          studentInfo: student,
                          courseId: course.id,
                          courseName: course.courseName,
                        })
                      }
                      firstName={student.studentFirstName}
                      lastName={student.studentLastName}
                      studentId={student.studentId}
                    >
                      <div className={classes.examsBox}>
                        {student.exams.map((exam) => (
                          <IndividualExams
                            examName={exam.examName}
                            examScore={exam.examScore}
                            key={exam.id}
                          />
                        ))}
                      </div>
                      <OverolScore examScores={student.exams} />
                    </StudentInfo>
                  </StudentCard>
                ))}

              {course.students.length === 0 && (
                <div className={classes.noStudentsNotion}>
                  <span>There are no students in this Course</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {showModal &&
        createPortal(
          <Modal onClose={closeModalHandler}>
            <AddExamForm
              onClose={closeModalHandler}
              // studentName={`${activeStudent.studentInfo.studentFirstName} ${activeStudent.studentInfo.studentLastName}`}
              courseName={activeStudent.courseName}
              // studentId={activeStudent.studentInfo.studentId}
              studentInfo={activeStudent.studentInfo}
              courseId={activeStudent.courseId}
            />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default MainBoxContent;

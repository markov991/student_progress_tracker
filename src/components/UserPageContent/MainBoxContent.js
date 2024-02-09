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
import AverageScore from "../OverolScore/AverageScore";
import StudentInfoModal from "../StudentInfoModal/StudentInfoModal";

const MainBoxContent = () => {
  const dispatch = useDispatch();
  const userCourses = useSelector((state) => state.userInfo.userCourses);
  const [addExamModal, setAddExamModal] = useState(false);
  const [openStudentInfoModal, setOpenStudentInfoModal] = useState(false);
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

    setAddExamModal(true);
    setActiveStudent({ ...student });
    console.log(activeStudent);
  };
  const openInfoHandler = (student) => {
    setOpenStudentInfoModal(true);
    setActiveStudent({ ...student });
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
    setAddExamModal(false);
    setOpenStudentInfoModal(false);
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
                      openInfo={() =>
                        openInfoHandler({
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
                      {student.exams.length > 0 && (
                        <AverageScore examScores={student.exams} />
                      )}
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
      {addExamModal &&
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
      {openStudentInfoModal &&
        createPortal(
          <Modal onClose={closeModalHandler}>
            <StudentInfoModal
              courseName={activeStudent.courseName}
              studentInfo={activeStudent.studentInfo}
              courseId={activeStudent.courseId}
              onClose={closeModalHandler}
            />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default MainBoxContent;

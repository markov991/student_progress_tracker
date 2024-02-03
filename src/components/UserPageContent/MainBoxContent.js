import React from "react";
import * as classes from "./MainBoxContent.module.css";
import { useSelector, useDispatch } from "react-redux";
import StudentCard from "../UI/StudentCard";
import StudentInfo from "../StudentInfo/StudentInfo";

import { removingStudentFromCourse } from "../../store/userInfoActions";

const MainBoxContent = () => {
  const dispatch = useDispatch();
  const userCourses = useSelector((state) => state.userInfo.userCourses);
  const userId = useSelector((state) => state.auth.userId);
  const deleteStudentHandler = (student) => {
    const { studentId, courseId } = student;

    dispatch(removingStudentFromCourse(userId, courseId, studentId));
  };
  return (
    <>
      <div className={classes.filterCoursesBox}>
        <button>All</button>
        {userCourses.map((course) => (
          <button key={course.id}>{course.courseName}</button>
        ))}
      </div>
      <div className={classes.filterCoursesList}>
        {/* <div className={student}></div> */}
        {userCourses.map((course) => (
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
                      firstName={student.studentFirstName}
                      lastName={student.studentLastName}
                      studentId={student.studentId}
                    >
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                    </StudentInfo>
                    {/* <div key={student.id}>{student.studentFirstName}</div> */}
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
    </>
  );
};

export default MainBoxContent;

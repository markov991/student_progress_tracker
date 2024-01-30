import React from "react";
import * as classes from "./MainBoxContent.module.css";
import { useSelector } from "react-redux";

const MainBoxContent = () => {
  const userCourses = useSelector((state) => state.userInfo.userCourses);
  return (
    <>
      <div className={classes.filterCoursesBox}>
        <button>All</button>
        {userCourses.map((course) => (
          <button key={course.id}>{course.courseName}</button>
        ))}
      </div>
      <div className={classes.filterCoursesList}>
        {userCourses.map((course) => (
          <div key={course.id}>
            <div className={classes.courseName}>
              <h1>{course.courseName}</h1>
            </div>
            <div>
              {course.students &&
                course.students.map((student) => (
                  <div key={student.id}>{student.studentFirstName}</div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainBoxContent;

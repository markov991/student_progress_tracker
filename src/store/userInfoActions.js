import { userInfoActions } from "./userInfoSlice";
import { uiActions } from "./ui-slice";

export const gettingDataFromDatabase = (userId) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading({ isLoading: true }));
    const gettingData = async () => {
      const sendingRequest = await fetch(
        `https://student-progress-tracker-f93fc-default-rtdb.firebaseio.com/users/${userId}.json`
      );
      if (!sendingRequest.ok) {
        throw new Error("Couldnt fetch user data");
      }
      const data = await sendingRequest.json();
      return data;
    };
    try {
      const dataFetchResult = await gettingData();
      console.log(dataFetchResult);
      const uCarray = [];
      if (dataFetchResult.userCourses) {
        for (const key in dataFetchResult.userCourses) {
          const courseObject = {
            id: key,
            ...dataFetchResult.userCourses[key],
          };
          const students = [];
          for (const key in courseObject.students) {
            const student = {
              id: key,
              ...courseObject.students[key],
            };
            students.push(student);
          }
          const course = {
            ...courseObject,
            students: students,
          };

          uCarray.push(course);
        }
      }
      dispatch(
        userInfoActions.settingUserInfo({
          userName: dataFetchResult.userName,
          userType: dataFetchResult.userType,
          userInfo: dataFetchResult.userInfo,
          userId: userId,
          userInfoFilled: dataFetchResult.userInfoFilled,
          userCourses: uCarray,
          students: dataFetchResult.students,
        })
      );
      dispatch(uiActions.setIsLoading({ isLoading: false }));
    } catch (error) {
      alert(error);
    }
  };
};
export const addingCourseToUser = (userId, course) => {
  return async (dispatch) => {
    const sendingCourseData = await fetch(
      `https://student-progress-tracker-f93fc-default-rtdb.firebaseio.com/users/${userId}/userCourses.json`,
      {
        method: "POST",
        body: JSON.stringify({
          courseName: course.courseName,
          courseYear: course.courseYear,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!sendingCourseData.ok) {
      throw new Error("not ok");
    }
    try {
      // const data = await sendingCourseData.json();
      dispatch(gettingDataFromDatabase(userId));
      dispatch(uiActions.setIsOpen({ modalIsOpen: false }));
    } catch (error) {
      alert(error);
    }
  };
};

export const addingStudentToCourse = (userId, courseId, studentInfo) => {
  return async (dispatch) => {
    const sendingStudentData = await fetch(
      `https://student-progress-tracker-f93fc-default-rtdb.firebaseio.com/users/${userId}/userCourses/${courseId}/students.json`,
      {
        method: "POST",
        body: JSON.stringify({
          studentFirstName: studentInfo.studentFirstName,
          studentLastName: studentInfo.studentLastName,
          studentId: studentInfo.studentId,
          studentScore: null,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!sendingStudentData) {
      throw new Error("Student data wasnt sent");
    }
    try {
      dispatch(gettingDataFromDatabase(userId));
      dispatch(uiActions.setIsOpen({ modalIsOpen: false }));
    } catch (error) {
      alert(error);
    }
  };
};

export const removingStudentFromCourse = (userId, courseId, studentId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://student-progress-tracker-f93fc-default-rtdb.firebaseio.com/users/${userId}/userCourses/${courseId}/students/${studentId}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response) {
      throw new Error("Student wasn't remove!");
    }
    try {
      dispatch(gettingDataFromDatabase(userId));
      // dispatch(uiActions.s)
    } catch (error) {
      alert(error);
    }
  };
};

export const sendingDataAfterRegistrationToDatabase = (userId, info) => {
  return async (dispatch) => {
    const sendingData = await fetch(
      ` https://student-progress-tracker-f93fc-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: info.userId,
          userInfoFilled: true,
          userType: info.userType,
          userName: info.userName,
          userCourses: null,
          userInfo: {
            faculty: info.userInfo.faculty,
            name: info.userInfo.name,

            university: info.userInfo.university,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!sendingData.ok) {
      throw new Error("Something went wrong");
    }
    try {
      dispatch(gettingDataFromDatabase(userId));
    } catch (error) {
      alert(error);
    }
  };
};

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
      dispatch(
        userInfoActions.settingUserInfo({
          userName: dataFetchResult.userName,
          userType: dataFetchResult.userType,
          userInfo: dataFetchResult.userInfo,
          userId: userId,
          userInfoFilled: dataFetchResult.userInfoFilled,
        })
      );
      dispatch(uiActions.setIsLoading({ isLoading: false }));
    } catch (error) {
      alert(error);
    }
  };
};

export const sendingDataAfterRegistrationToDatabase = (userId, info) => {
  console.log(info);
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
          userExams: null,
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

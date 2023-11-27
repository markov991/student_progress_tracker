import { authActions } from "./authSlice";

export const creatingAccount = (email, password) => {
  const [userName] = email.split("@");

  return async (dispatch) => {
    const registerAccount = async () => {
      const sendingdata = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAL3KOoZF8_rxfcemTTdXqvjuTo2APL4-c",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("sent");
      if (!sendingdata.ok) {
        throw new Error("Could not register account");
      }
      const data = await sendingdata.json();
      return data;
    };
    try {
      const registrationResult = await registerAccount();
      const creatingDataInDatabase = async () => {
        const sendingdata = await fetch(
          `https://student-progress-tracker-f93fc-default-rtdb.firebaseio.com/users/${registrationResult.localId}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              userId: registrationResult.localId,
              userInfoFilled: false,
              userType: null,
              userName: userName,
              userInfo: {
                faculty: null,
                name: null,
                studiesType: null,
                university: null,
              },
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await sendingdata.json();
      };
      await creatingDataInDatabase();

      dispatch(
        authActions.logingIn({
          userEmail: email,
          userId: registrationResult.localId,
          userName: userName,
        })
      );
    } catch (error) {
      alert(error);
    }
  };
};

export const loggingToAnAccount = (email, password) => {
  const [userName] = email.split("@");
  return async (dispatch) => {
    const gettingAuth = async () => {
      const sendingdata = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAL3KOoZF8_rxfcemTTdXqvjuTo2APL4-c",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("sent");
      if (!sendingdata.ok) {
        throw new Error("Could not register account");
      }
      const data = await sendingdata.json();
      return data;
    };
    try {
      const logingInResult = await gettingAuth();
      const gettingDataFromDatabase = async () => {
        const gettingData = await fetch(
          `https://student-progress-tracker-f93fc-default-rtdb.firebaseio.com/users/${logingInResult.localId}.json`
        );
        const data = await gettingData.json();
        // console.log(data);
        return data;
      };
      try {
        const dataFetchResult = await gettingDataFromDatabase();
        console.log(dataFetchResult);
      } catch (error) {
        alert(error);
      }

      dispatch(
        authActions.logingIn({
          userEmail: email,
          userId: logingInResult.localId,
          userName: userName,
        })
      );
    } catch (error) {
      alert(error);
    }
  };
};

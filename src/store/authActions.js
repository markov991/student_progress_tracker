import { authActions } from "./authSlice";

export const creatingAccount = (email, password) => {
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

      dispatch(authActions.logingIn({ userEmail: email }));
    } catch (error) {
      alert(error);
    }
  };
};

export const loggingToAnAccount = (email, password) => {
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

      dispatch(authActions.logingIn({ userEmail: email }));
    } catch (error) {
      alert(error);
    }
  };
};

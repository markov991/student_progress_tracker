import React, { useRef } from "react";
import * as classes from "./AuthForm.module.css";
import { authActions } from "../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { creatingAccount, loggingToAnAccount } from "../../store/authActions";

const AuthForm = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const haveAnAccoont = useSelector((state) => state.auth.haveAnAccount);
  const x = useSelector((state) => state.auth.user);

  const toggleAuthComp = (e) => {
    e.preventDefault();
    dispatch(authActions.toogleAuth());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (haveAnAccoont) {
      dispatch(loggingToAnAccount(enteredEmail, enteredPassword));
    }
    if (!haveAnAccoont) {
      dispatch(creatingAccount(enteredEmail, enteredPassword));
    }
  };

  return (
    <section className={classes.auth}>
      <h2>{haveAnAccoont ? "WELCOME BACK" : "WELCOME"}</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            placeholder="Plese enter your email"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            placeholder="Please enter your password"
          />
        </div>
        <div className={classes.buttonSub}>
          {haveAnAccoont ? <button>Login</button> : <button>Sign up</button>}
        </div>
      </form>

      <div className={classes.switchForm}>
        {haveAnAccoont ? (
          <>
            <button onClick={toggleAuthComp} href="#">
              Dont have an account?
            </button>
            <button href="#">Forgot a password?</button>
          </>
        ) : (
          <button onClick={toggleAuthComp} href="#">
            Allready have an account
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthForm;

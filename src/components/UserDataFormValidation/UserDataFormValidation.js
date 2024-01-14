import React, { useRef, useState } from "react";
import * as classes from "./UserDataFormValidation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { sendingDataAfterRegistrationToDatabase } from "../../store/userInfoActions";

const UserDataFormValidation = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.userName);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const acctype = useRef();
  const facultyRef = useRef();
  const universityRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const fullName =
      firstNameRef.current.value + " " + lastNameRef.current.value;
    const userType = acctype.current.value;
    const userInfo = {
      name: fullName,
      faculty: facultyRef.current.value,

      university: universityRef.current.value,
    };

    if (
      !firstNameRef.current.value ||
      !lastNameRef.current.value ||
      !acctype.current.value ||
      !facultyRef.current.value ||
      !universityRef.current.value
    ) {
      alert("All fields must be fullfiled!!!");
      return;
    }
    if (
      firstNameRef.current.value &&
      lastNameRef.current.value &&
      acctype.current.value &&
      facultyRef.current.value &&
      universityRef.current.value
    ) {
      dispatch(
        sendingDataAfterRegistrationToDatabase(userId, {
          userName: userName,
          userType: userType,
          userId: userId,
          userInfo,
        })
      );
    }
  };

  return (
    <div className={classes.userDataFormBox}>
      <h2>Welcome to the student progress tracker</h2>
      <p>Please fulfill your profile so you can use our app!!</p>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              ref={firstNameRef}
              placeholder="Please enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              ref={lastNameRef}
              placeholder="Plese enter your last name"
            />
          </div>
          <div>
            <label htmlFor="type-select">Account type</label>
            <select name="types" id="type-select" ref={acctype}>
              <option value="">Please select</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Full Professor">Full Professor</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="faculty">Faculty</label>
            <input
              type="text"
              id="faculty"
              ref={facultyRef}
              placeholder="Please enter your faculty"
            />
          </div>
          <div>
            <label htmlFor="university">University</label>
            <input
              type="text"
              id="university"
              ref={universityRef}
              placeholder="Please eneter university you are in"
            />
          </div>
        </div>
        <div className={classes.btn_sub}>
          <button>Subbmit</button>
        </div>
      </form>
    </div>
  );
};

export default UserDataFormValidation;

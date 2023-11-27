import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettingDataFromDatabase } from "../store/userInfoActions";
import "./index.css";

import UserPageContent from "../components/UserPageContent/UserPageContent";
import UserDataFormValidation from "../components/UserDataFormValidation/UserDataFormValidation";
import LoadingSpiner from "../components/UI/LoadingSpiner";

const HomePage = () => {
  const USERS_DUMMY = [
    {
      username: "markov991",
      userID: "12345",
      userType: "student",
      userInfoFilled: true,
      userInfo: {
        name: "Petar Petrovic",
        studiesType: "Undergraduate studies",
        university: "University of Belgrade",
        faculty: "Facility of law",
      },
      pendingRequests: [],
      approvedRequests: ["6789"],
    },
    {
      userName: "milosjov",
      userID: "6789",
      userType: "professor",
      userInfoFilled: true,
      userInfo: {
        name: "Milos Jovanovic",
        studiesType: "Full-Time Profesor",
        university: "University of Belgrade",
        faculty: "Facility of law",
      },
    },
  ];

  const EXAMS_DIMMY = [
    {
      examName: "Roman Law",
      examID: "6789",
      pendingStudents: [],
      approvedStudent: ["1234"],
      examDates: ["15-11-2023"],
    },
  ];
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const userId = useSelector((state) => state.auth.userId);
  const userInfoFilled = useSelector((state) => state.userInfo.userInfoFilled);

  useEffect(() => {
    if (userId) {
      dispatch(gettingDataFromDatabase(userId));
      console.log(userId);
    }
  }, [userId, dispatch]);

  console.log(userId);
  return (
    <>
      {isLoading && <LoadingSpiner />}
      {!isLoading && userInfoFilled && (
        <div className="grid-2-coll">
          <UserPageContent />
        </div>
      )}
      {!isLoading && !userInfoFilled && (
        <div className="flex-centered">
          <UserDataFormValidation />
        </div>
      )}
    </>
  );
};

export default HomePage;

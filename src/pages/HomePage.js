import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettingDataFromDatabase } from "../store/userInfoActions";
import "./index.css";

import UserPageContent from "../components/UserPageContent/UserPageContent";
import UserDataFormValidation from "../components/UserDataFormValidation/UserDataFormValidation";
import LoadingSpiner from "../components/UI/LoadingSpiner";

const HomePage = () => {
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

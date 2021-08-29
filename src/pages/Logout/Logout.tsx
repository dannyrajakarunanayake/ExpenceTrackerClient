import React, { useEffect } from "react";
import { logout } from "../../slices/auth";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices";

interface LogOutProps {}

const LogOut = (props: LogOutProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (!authToken) {
      history.push("/");
    }
  }, [authToken, history]);

  return <div></div>;
};

export default LogOut;

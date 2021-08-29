import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../utils/store";
import CustomerAPI, { LoginSuccessResponse } from "../utils/customer-api";

type InitialState = {
  authToken: string | null;
  hasErrors?: boolean;
  errorMessage: string | null;
};

export const initialState: InitialState = {
  hasErrors: false,
  authToken: null,
  errorMessage: null,
};

type LoginPayload = {
  authToken: string;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginBegin: (state) => ({
      ...state,
      errorMessage: null,
      hasErrors: false,
    }),
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => ({
      ...state,
      authToken: action.payload.authToken,
    }),
    loginFailure: (state, action: PayloadAction<{ errorMessage: string }>) => ({
      ...state,
      hasErrors: true,
      errorMessage: action.payload.errorMessage,
    }),
    logoutBegin: (state) => ({
      ...state,
      errorMessage: null,
      hasErrors: false,
    }),
    logoutSuccess: (state) => ({
      ...state,
      hasErrors: false,
      authToken: null,
    }),
    logoutFailure: (
      state,
      action: PayloadAction<{ errorMessage: string }>
    ) => ({
      ...state,
      hasErrors: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
});

const {
  loginBegin,
  loginSuccess,
  loginFailure,
  logoutBegin,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;

export const login =
  (username: string, password: string) => async (dispatch: any) => {
    dispatch(loginBegin());
    // DISPATCH THE LOGIN API CALL
    try {
      const authentication: LoginSuccessResponse = await CustomerAPI
        .login
        // username,
        // password
        ();
      // CALL IT IN THE LOCAL STORAGE
      localStorage.setItem("authToken", authentication.authToken);

      const auth = {
        authToken: authentication.authToken,
      };
      dispatch(loginSuccess(auth));
    } catch (e) {
      dispatch(loginFailure({ errorMessage: e.message }));
    }
  };

// Handling Logout

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(logoutBegin());
  try {
    localStorage.removeItem("authToken");
    dispatch(logoutSuccess());
  } catch (e) {
    dispatch(logoutFailure({ errorMessage: e.message }));
  }
};

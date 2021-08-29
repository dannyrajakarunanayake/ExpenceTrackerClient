import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../utils/store";
import CustomerAPI, { RegisterSuccessResponse } from "../utils/customer-api";

type InitialState = {
  username: string | null;
  password: string | null;
  submitSucceeded?: boolean;
  hasErrors?: boolean;
  errorMessage: string | null;
};

export const initialState: InitialState = {
  username: null,
  password: null,
  submitSucceeded: false,
  hasErrors: false,
  errorMessage: null,
};

type RegisterPayload = {
  username: string;
  password: string;
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerBegin: (state) => ({
      ...state,
      errorMessage: null,
      hasErrors: false,
    }),
    registerSuccess: (state, action: PayloadAction<RegisterPayload>) => ({
      ...state,
      submitSucceeded: true,
      username: action.payload.username,
      password: action.payload.password,
    }),
    registerFailure: (
      state,
      action: PayloadAction<{ errorMessage: string }>
    ) => ({
      ...state,
      submitSucceeded: false,
      hasErrors: true,
      errorMessage: action.payload.errorMessage,
    }),
  },
});
const { registerBegin, registerSuccess, registerFailure } =
  registerSlice.actions;

export default registerSlice.reducer;

export const registerUser =
  (username: string, password: string) => async (dispatch:any) => {
    dispatch(registerBegin());
    
    try {
      const customerApi = new CustomerAPI();
      const response: RegisterSuccessResponse = await customerApi.register(
        username,
        password
      );
      // CALL IT IN THE LOCAL STORAGE
      localStorage.getItem("username");

      
      dispatch(registerSuccess(response));
    } catch (e) {
      dispatch(registerFailure({ errorMessage: e.message }));
    }
  };

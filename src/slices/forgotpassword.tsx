import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CustomerAPI, { ResetPasswordSuccess } from "../utils/customer-api";

type InitialState = {
  hasError?: boolean;
  submitSucceeded?: boolean;
  errorMessage?: string | null;
};

export const initialState: InitialState = {
  hasError: false,
  errorMessage: null,
  submitSucceeded: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordBegin: (state) => ({
      ...state,
      errorMessage: null,
      hasErrors: false,
    }),
    forgotPasswordSuccess: (state) => {
      return {
        ...state,
        submitSucceeded: true,
        hasErrors: false,
      };
    },
    forgotPasswordFailure: (
      state,
      action: PayloadAction<{ errorMessage: string }>
    ) => {
      return {
        ...state,
        hasErrors: true,
        errorMessage: action.payload.errorMessage,
        submitSucceeded: false,
      };
    },
  },
});

const { forgotPasswordBegin, forgotPasswordSuccess, forgotPasswordFailure } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;

//Thunk to generate the temporary password and update the password status

export const tempPasswordUpdate =
  (userCredentials: any) => async (dispatch: any) => {
    try {
      dispatch(forgotPasswordBegin());
      const customerApi = new CustomerAPI();
      const response: ResetPasswordSuccess = await customerApi.forgotPassword(
        userCredentials
      );
      dispatch(forgotPasswordSuccess());
    } catch (e) {
      dispatch(forgotPasswordFailure({ errorMessage: e.message }));
    }
  };

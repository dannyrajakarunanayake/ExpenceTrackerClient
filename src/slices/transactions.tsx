import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../utils/store";
import CustomerAPI, { AddTransactionsSuccess } from "../utils/customer-api";

type InitialState = {
  submitSucceeded?: boolean;
  errorMessage: string | null;
  transactions: [
    {
      userId: string | null;
      text: string | null;
      amount: number | null;
    }
  ];
};

export const initialState: InitialState = {
  submitSucceeded: false,
  errorMessage: null,
  transactions: [
    {
      userId: null,
      text: null,
      amount: 0,
    },
  ],
};

const registerSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    transactionBegin: (state) => ({
      ...state,
      errorMessage: null,
    }),
    transactionSuccess: (state, action: PayloadAction<any>) => ({
      ...state,
      submitSucceeded: true,
      errorMessage: null,
      transactions: [action.payload.transaction],
    }),
    transactionFailure: (state, action: PayloadAction<any>) => ({
      ...state,
      submitSucceeded: false,
      errorMessage: action.payload.errorMessage,
    }),

    transactionListBegin: (state) => ({
      ...state,
    }),
    transactionListSuccess: (state, { payload }) => ({
      ...state,
      transactions: payload.transaction,
    }),
    transactionListFailure: (state, action: PayloadAction<any>) => ({
      ...state,
    }),
  },
});
const {
  transactionBegin,
  transactionSuccess,
  transactionFailure,
  transactionListBegin,
  transactionListSuccess,
  transactionListFailure,
} = registerSlice.actions;

export default registerSlice.reducer;

export const transactionsDetails =
  (text: string, amount: number) => async (dispatch: any) => {
    dispatch(transactionBegin());

    try {
      const customerApi = new CustomerAPI();
      const response = await customerApi.addTransactions(text, amount);
      dispatch(transactionSuccess(response));
    } catch (e) {
      dispatch(transactionFailure({ errMessage: e.message }));
    }
  };

export const transactionsList = () => async (dispatch: any) => {
  dispatch(transactionListBegin());

  try {
    const customerApi = new CustomerAPI();
    const response = await customerApi.listTransactions();
    dispatch(transactionListSuccess(response));
  } catch (e) {
    dispatch(transactionListFailure({ errMessage: e.message }));
  }
};

import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import rootReducer, { RootState } from "../slices";
import { initialState as authInitialState } from "../slices/auth";

const getPersistedLoginState = (): {
  auth?: typeof authInitialState;
} => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    return {
      auth: {
        ...authInitialState,
        authToken: authToken,
        hasErrors: false,
        errorMessage: null,
      },
    };
  } else {
    return {};
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: getPersistedLoginState(),
 
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;

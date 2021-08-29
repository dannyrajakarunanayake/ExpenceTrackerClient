import { combineReducers } from "redux";
import authReducer from "./auth";
import forgotPasswordReducer from "./forgotpassword";
import registerReducer from "./register";
import transactionsReducer from "./transactions";

export type RootState = ReturnType<typeof rootReducer>;

const appReducer = combineReducers({
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  register: registerReducer,
  transactions: transactionsReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

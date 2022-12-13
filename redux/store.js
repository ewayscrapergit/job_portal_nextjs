import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  updatePassReducer,
  userLoginReducer,
  userOtpReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { popupReducer } from "./reducers/popupReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,

  popuphn: popupReducer,
  userOtp: userOtpReducer,
  updatepass: updatePassReducer,
});

const userInfoFromStorage =
  typeof window !== "undefined" && localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

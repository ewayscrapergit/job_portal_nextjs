import {
  SENT_OTP_FAIL,
  SENT_OTP_REQUEST,
  SENT_OTP_SUCCESS,
  UPDATE_PASS_FAIL,
  UPDATE_PASS_REQUEST,
  UPDATE_PASS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        popup: true,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        popup: true,
      };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, msg: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case SENT_OTP_REQUEST:
      return { loading: true };
    case SENT_OTP_SUCCESS:
      return {
        loading: false,
        status: action.payload.status,
        msg: action.payload.msg,
      };
    case SENT_OTP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePassReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASS_REQUEST:
      return { loading: true };
    case UPDATE_PASS_SUCCESS:
      return {
        loading: false,
        status: action.payload.status,
        msg: action.payload.msg,
      };
    case UPDATE_PASS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  SENT_OTP_FAIL,
  SENT_OTP_REQUEST,
  SENT_OTP_SUCCESS,
  UPDATE_PASS_REQUEST,
  UPDATE_PASS_SUCCESS,
  UPDATE_PASS_FAIL,
} from "../constants/userConstants";

export const register = (values) => async (dispatch) => {
  // console.log(values);
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.URL}/api/user/register`,
      values,
      config
    );

    if (data.status == "1") {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.data[0],
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data[0],
      });

      localStorage.setItem("userInfo", JSON.stringify(data.data[0]));
    } else {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: data.msg,
      });
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const login = (values) => async (dispatch) => {
  try {
    let email = values.email;
    let password = values.password;

    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.URL}/api/user/login`,
      { email, password },
      config
    );

    if (data.status == "1") {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data[0],
      });

      localStorage.setItem("userInfo", JSON.stringify(data.data[0]));
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.msg,
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  // localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/";
};



export const updateUser = (values) => async (dispatch) => {
  try {
    let user_id = values.user_id;
    let first_name = values.first_name;
    let last_name = values.last_name;
    let password = values.password;

    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.URL}/api/users/update`,
      { user_id, first_name, last_name, password },
      config
    );
    if (data.status == "1") {
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data.msg,
      });
      localStorage.removeItem("userInfo");
      document.location.href = "/";
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.message,
    });
  }
};

export const sentOtp = (values) => async (dispatch) => {
  try {
    let email = values.email;

    dispatch({
      type: SENT_OTP_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.URL}/api/otp`,
      { email },
      config
    );

    dispatch({
      type: SENT_OTP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SENT_OTP_FAIL,
      payload: error.message,
    });
  }
};

export const passwordUpdate = (values) => async (dispatch) => {
  try {
    let otp = values.otp;
    let password = values.password;
    let con_password = values.con_password;

    dispatch({
      type: UPDATE_PASS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.URL}/api/update-pass`,
      { otp, password, con_password },
      config
    );
    // console.log(data);

    dispatch({
      type: UPDATE_PASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASS_FAIL,
      payload: error.message,
    });
  }
};

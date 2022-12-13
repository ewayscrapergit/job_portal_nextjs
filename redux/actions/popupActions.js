import { POPUP_CLOSE } from "../constants/popupConstants";

export const popupAction = () => (dispatch) => {
  dispatch({ type: POPUP_CLOSE });
};

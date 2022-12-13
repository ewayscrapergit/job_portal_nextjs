import { POPUP_CLOSE } from "../constants/popupConstants";

export const popupReducer = (state = {}, action) => {
    switch (action.type) {
      case POPUP_CLOSE:
        return {
          loading: false,
          cuspopup: true,
        };
      default:
        return state;
    }
  };
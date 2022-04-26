export const SET_SNACKBAR = "teamly/settings/SET_SNACKBAR";

// dat 
interface snackbarInterface {
    snackbarOpen: boolean,
    snackbarType: string,
    snackbarMessage: string
}

const initialState : snackbarInterface = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: ""
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType } = action;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage
      };
    default:
      return state;
  }
};

export const setSnackbar = (
  snackbarOpen = false,
  snackbarType = "success",
  snackbarMessage = ""
) => ({
  type: SET_SNACKBAR,
  snackbarOpen,
  snackbarType,
  snackbarMessage
});

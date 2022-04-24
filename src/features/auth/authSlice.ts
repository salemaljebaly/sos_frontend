import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { LoginModel , UserState } from "./AuthModel";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user")!);
const initialState : UserState = {
  user: user ? user : null, // check if there is user
  isError: false,
  isSucces: false,
  isLoading: false,
  message: "",
};

// login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginModel, thunkAPI) => {
    try {

      return await authService.login(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ------------------------------------------------------------------------------------------- //
// logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
  })

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------------------------------------------------------------ //
      // register
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string; // get value when reject
        console.log("from reject " + action.payload);
        state.user = null;
      })
      // ------------------------------------------------------------------ //
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

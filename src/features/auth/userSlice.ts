import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { LoginModel, UserModel, UsersModel, UserState } from "./userModel";
import { ErrorResponse } from "./ErrorResponse";
import { RootState } from "../../app/store";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user")!);
const initialState : UserState = {
  user: user ? user : null, // check if there is user
  isError: false,
  isSucces: false,
  isLoading: false,
  message: "",
};

// ------------------------------------------------------------------------------------------- //
// Register user
export const register = createAsyncThunk(
  "user/register",
  async (user: UserModel, thunkAPI) => {
    try {
      return await authService.register(user);
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
// login user
export const login = createAsyncThunk(
  "user/registlgoer",
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
// get all users
export const getAllUser = createAsyncThunk (
  "user/getAll",
  async (_, thunkAPI) => {
    try {
      return await authService.getAllUsers(user.access_token.toString());
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
// delete user by id
export const deleteUserById = createAsyncThunk (
  "user/deleteUserByID",
  async (id : number, thunkAPI) => {
    try {
      return await authService.deleteUserById(user.access_token.toString(), id);
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
// update user by id
export const updateUserById = createAsyncThunk (
  "user/updateUserById",
  async (userData : Partial<UserModel>, thunkAPI) => {
    try {
      const {id, ...fields} = userData;
      return await authService.updateUserById(user.access_token.toString(), id!, fields);
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
// update user by id
export const findUserById = createAsyncThunk (
  "user/findUserById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find user works
      return await authService.findUserByID(user.access_token.toString(), id);
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
// update user by id
export const searchInUsers = createAsyncThunk (
  "user/searchInUsers",
  async (keyword : string, thunkAPI) => {
    try {
      // TODO check find user works
      return await authService.searchInUsers(user.access_token.toString(), keyword);
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

export const authSlice = createSlice({
  name: "user",
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
        console.log(action.payload)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string; // get value when reject
        state.user = null;
      })
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
      // get All user
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string; // get value when reject
        console.log("from reject " + action.payload);
        state.user = null;
      })
      // ------------------------------------------------------------------ //
      // update user by id
      // TODO return fix  update message 
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string; // get value when reject
        console.log("from reject " + action.payload);
        state.user = null;
      })
      // ------------------------------------------------------------------ //
      // find user by id
      // TODO return fix  delete message 
      .addCase(findUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(findUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string; // get value when reject
        console.log("from reject " + action.payload);
        state.user = null;
      })
      // ------------------------------------------------------------------ //
      // find user by id
      // TODO return fix  delete message 
      .addCase(searchInUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchInUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(searchInUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string; // get value when reject
        console.log("from reject " + action.payload);
        state.user = null;
      })
      // ------------------------------------------------------------------ //
      // delete user by id
      // TODO return fix  delete message 
      .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string; // get value when reject
        console.log("from reject " + action.payload);
        state.user = null;
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

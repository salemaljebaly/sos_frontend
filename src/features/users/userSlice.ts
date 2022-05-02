import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { LoginModel, UserModel, UsersModel, UserState } from "./userModel";
import { Role } from "../../utils/enum/role.enum";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user")!);
const initialState: UserState = {
  users: [], // check if there is user
  singleUser: {},
  isError: false,
  isSucces: false,
  isLoading: false,
  processDone: false,
  message: [],
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
  "user/login",
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
export const getAllUser = createAsyncThunk(
  "user/getAll",
  async (_, thunkAPI) => {
    try {
      // TODO get token from redux state not local storage
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
export const deleteUserById = createAsyncThunk(
  "user/deleteUserByID",
  async (id: number, thunkAPI) => {
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
export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (userData: Partial<UserModel>, thunkAPI) => {
    try {
      const { id, ...fields } = userData;
      return await authService.updateUserById(
        user.access_token.toString(),
        id!,
        fields
      );
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
export const findUserById = createAsyncThunk(
  "user/findUserById",
  async (id: number, thunkAPI) => {
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
export const searchInUsers = createAsyncThunk(
  "user/searchInUsers",
  async (keyword: string, thunkAPI) => {
    try {
      // TODO check find user works
      return await authService.searchInUsers(
        user.access_token.toString(),
        keyword
      );
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.users = null;
      state.singleUser = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingleUser: (state) => {
      state.singleUser = {
        isActive: false,
        role: Role.User,
      };
      state.message = [];
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data
    handleChangeData: (state, action) => {
      console.log(action.payload);
      state.singleUser = {
        ...state.singleUser,
        [action.payload.name]: action.payload.value,
      };
    },
    // ------------------------------------------------------------------ //
  },
  extraReducers: (builder) => {
    builder
      // ------------------------------------------------------------------ //
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
        state.processDone = false;
        state.message = [];
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.processDone = true;
        state.users = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.users = null;
      })
      // ------------------------------------------------------------------ //
      // get All user
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.users = null;
      })
      // ------------------------------------------------------------------ //
      // update user by id
      // TODO return fix  update message
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = true;
        state.users = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        console.log("from reject " + action.payload);
        state.users = null;
      })
      // ------------------------------------------------------------------ //
      // find user by id
      // TODO return fix  delete message
      .addCase(findUserById.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(findUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.singleUser = action.payload;
      })
      .addCase(findUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        console.log("from reject " + action.payload);
        state.singleUser = null;
      })
      // ------------------------------------------------------------------ //
      // find user by id
      // TODO return fix  delete message
      .addCase(searchInUsers.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(searchInUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.users = action.payload;
      })
      .addCase(searchInUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        console.log("from reject " + action.payload);
        state.users = null;
      })
      // ------------------------------------------------------------------ //
      // delete user by id
      // TODO return fix  delete message
      .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.users = action.payload;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        console.log("from reject " + action.payload);
        state.users = null;
      });
    // ------------------------------------------------------------------ //
  },
});

export const { reset, resetSingleUser, handleChangeData } = userSlice.actions;
export default userSlice.reducer;

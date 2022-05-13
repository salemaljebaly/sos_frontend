import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./citizensService";
import { LoginModel, CitizenModel, UserState, CitizensModel } from "./citizensModel";
import { RootState } from "../../app/store";
import { UserModelFromToken } from "../users/userModel";

// Get citizen from local storage
const user = JSON.parse(localStorage.getItem("user")!) as UserModelFromToken;
const initialState : UserState = {
  citizens: [], // check if there is citizen
  singleCitizen : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  processDone: false,
  message: [],
  count: 0
};

// ------------------------------------------------------------------------------------------- //
// Register citizen
export const add = createAsyncThunk(
  "citizen/add",
  async (citizen: CitizenModel, thunkAPI) => {
    try {
      return await authService.add(citizen, user.access_token.toString());
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
// login citizen
export const login = createAsyncThunk(
  "citizen/login",
  async (citizen: LoginModel, thunkAPI) => {
    try {

      return await authService.login(citizen);
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
// get all citizens
export const getAll = createAsyncThunk<CitizensModel[], undefined, { state: RootState }> (
  "citizen/getAll",
  async (_, thunkAPI) => {
    try {
      const access_token :any = thunkAPI.getState().auth.user?.access_token;
      return await authService.getAll(access_token);
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
// get all citizens
export const countAll = createAsyncThunk<number, undefined, {state : RootState}> (
  "citizen/countAll",
  async (_, thunkAPI) => {
    try {
      const access_token :any = thunkAPI.getState().auth.user?.access_token;
      return await authService.countAll(access_token) as number;
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
// delete citizen by id
export const deleteById = createAsyncThunk (
  "citizen/deleteById",
  async (id : number, thunkAPI) => {
    try {
      return await authService.deleteById(user.access_token, id);
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
// update citizen by id
export const updateById = createAsyncThunk (
  "citizen/updateById",
  async (citizenData : Partial<CitizenModel>, thunkAPI) => {
    try {
      const {id, ...fields} = citizenData;
      return await authService.updateById(user.access_token, id!, fields);
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
// update citizen by id
export const findById = createAsyncThunk (
  "citizen/findById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find citizen works
      return await authService.findByID(user.access_token, id);
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
// update citizen by id
export const searchIn = createAsyncThunk (
  "citizen/searchIn",
  async (keyword : string, thunkAPI) => {
    try {
      // TODO check find citizen works
      return await authService.searchIn(user.access_token, keyword);
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

export const citizenSlice = createSlice({
  name: "citizen",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.citizens = [];
      state.singleCitizen = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleCitizen = {
        isActive: false,
      };
      state.message = [];
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      console.log(action.payload);
      state.singleCitizen = {
        ...state.singleCitizen, 
        [action.payload.name] : action.payload.value
      }
    }
    // ------------------------------------------------------------------ //
  },
  extraReducers: (builder) => {
    builder
      // ------------------------------------------------------------------ //
      // register
      .addCase(add.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
        state.processDone = false;
        state.message = [];
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.processDone = true;
        state.citizens = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = [];
      })
      // ------------------------------------------------------------------ //
      // get All citizen
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.citizens = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = [];
      })
      // ------------------------------------------------------------------ //
      // get count citizen
      .addCase(countAll.pending, (state) => {
        state.count = 0;
      })
      .addCase(countAll.fulfilled, (state, action) => {
        state.count = action.payload;
      })
      .addCase(countAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.count = 0;
      })
      // ------------------------------------------------------------------ //
      // update citizen by id
      // TODO return fix  update message 
      .addCase(updateById.pending, (state) => {
        
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
        state.processDone = false;
        state.message = [];
      })
      .addCase(updateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = true;
        state.citizens = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = [];
      })
      // ------------------------------------------------------------------ //
      // find citizen by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.singleCitizen =  action.payload;
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleCitizen = null;
      })
      // ------------------------------------------------------------------ //
      // find citizen by id
      // TODO return fix  delete message 
      .addCase(searchIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.citizens = action.payload;
      })
      .addCase(searchIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = [];
      })
      // ------------------------------------------------------------------ //
      // delete citizen by id
      // TODO return fix  delete message 
      .addCase(deleteById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.citizens = state.citizens.filter((citizen : CitizensModel)=> citizen.id !== action.payload)
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = citizenSlice.actions;
export default citizenSlice.reducer;

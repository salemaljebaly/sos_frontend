import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./citizensService";
import { LoginModel, CitizenModel, UserState } from "./citizensModel";

// Get citizen from local storage
const citizen = JSON.parse(localStorage.getItem("user")!);
const initialState : UserState = {
  citizens: [], // check if there is citizen
  singleCitizen : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  message: [],
};

// ------------------------------------------------------------------------------------------- //
// Register citizen
export const add = createAsyncThunk(
  "citizen/add",
  async (citizen: CitizenModel, thunkAPI) => {
    try {
      return await authService.add(citizen);
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
export const getAll = createAsyncThunk (
  "citizen/getAll",
  async (_, thunkAPI) => {
    try {
      // TODO get token from redux state not local storage
      return await authService.getAll(citizen.access_token.toString());
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
      return await authService.deleteById(citizen.access_token.toString(), id);
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
      return await authService.updateById(citizen.access_token.toString(), id!, fields);
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
      return await authService.findByID(citizen.access_token.toString(), id);
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
      return await authService.searchIn(citizen.access_token.toString(), keyword);
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
      state.citizens = null;
      state.singleCitizen = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
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
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.citizens = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = null;
      })
      // ------------------------------------------------------------------ //
      // get All citizen
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.citizens = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = null;
      })
      // ------------------------------------------------------------------ //
      // update citizen by id
      // TODO return fix  update message 
      .addCase(updateById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.citizens = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = null;
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
        state.citizens = action.payload;
      })
      .addCase(searchIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = null;
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
        state.citizens = action.payload;
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = null;
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = citizenSlice.actions;
export default citizenSlice.reducer;

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
export const register = createAsyncThunk(
  "citizen/register",
  async (citizen: CitizenModel, thunkAPI) => {
    try {
      return await authService.register(citizen);
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
export const getAllCitizens = createAsyncThunk (
  "citizen/getAll",
  async (_, thunkAPI) => {
    try {
      // TODO get token from redux state not local storage
      console.log(citizen.access_token.toString());
      return await authService.getAllCitizens(citizen.access_token.toString());
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
export const deleteUserById = createAsyncThunk (
  "citizen/deleteUserByID",
  async (id : number, thunkAPI) => {
    try {
      return await authService.deleteCitizenById(citizen.access_token.toString(), id);
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
export const updateUserById = createAsyncThunk (
  "citizen/updateUserById",
  async (citizenData : Partial<CitizenModel>, thunkAPI) => {
    try {
      const {id, ...fields} = citizenData;
      return await authService.updateCitizenById(citizen.access_token.toString(), id!, fields);
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
export const findUserById = createAsyncThunk (
  "citizen/findUserById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find citizen works
      return await authService.findCitizenByID(citizen.access_token.toString(), id);
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
export const searchInUsers = createAsyncThunk (
  "citizen/searchInUsers",
  async (keyword : string, thunkAPI) => {
    try {
      // TODO check find citizen works
      return await authService.searchInCitizens(citizen.access_token.toString(), keyword);
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
    resetSingleCitizen: (state) => {
      state.singleCitizen = {
        isActive: false,
      };
      state.message = [];
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      console.log(action.payload)
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.citizens = action.payload;
        console.log(action.payload)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = null;
      })
      // ------------------------------------------------------------------ //
      // get All citizen
      .addCase(getAllCitizens.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCitizens.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.citizens = action.payload;
      })
      .addCase(getAllCitizens.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.citizens = null;
      })
      // ------------------------------------------------------------------ //
      // update citizen by id
      // TODO return fix  update message 
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.citizens = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        console.log("from reject " + action.payload);
        state.citizens = null;
      })
      // ------------------------------------------------------------------ //
      // find citizen by id
      // TODO return fix  delete message 
      .addCase(findUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.singleCitizen =  action.payload;
      })
      .addCase(findUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        console.log("from reject " + action.payload);
        state.singleCitizen = null;
      })
      // ------------------------------------------------------------------ //
      // find citizen by id
      // TODO return fix  delete message 
      .addCase(searchInUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchInUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.citizens = action.payload;
      })
      .addCase(searchInUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        console.log("from reject " + action.payload);
        state.citizens = null;
      })
      // ------------------------------------------------------------------ //
      // delete citizen by id
      // TODO return fix  delete message 
      .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.citizens = action.payload;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        console.log("from reject " + action.payload);
        state.citizens = null;
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingleCitizen, handleChangeData} = citizenSlice.actions;
export default citizenSlice.reducer;

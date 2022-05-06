import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./aboutService";
import { AboutModel, AboutState } from "./aboutModel";

const initialState : AboutState = {
  Abouts: [], // check if there is PoliceOffices
  singleAbout : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  // use this property to check add and edit process
  processDone : false,
  message: [],
};

// ------------------------------------------------------------------------------------------- //
// Register PoliceOffices
export const add = createAsyncThunk(
  "PoliceOffices/add",
  async (about: AboutModel, thunkAPI) => {
    try {
      return await authService.add(about);
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
// get all PoliceOfficess
export const getAll = createAsyncThunk (
  "PoliceOffices/getAll",
  async (_, thunkAPI) => {
    try {
      // TODO get token from redux state not local storage
      return await authService.getAll();
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
// delete PoliceOffices by id
export const deleteById = createAsyncThunk (
  "PoliceOffices/deleteById",
  async (id : number, thunkAPI) => {
    try {
      return await authService.deleteById(id);
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
// update PoliceOffices by id
export const updateById = createAsyncThunk (
  "PoliceOffices/updateById",
  async (about : Partial<AboutModel>, thunkAPI) => {
    try {
      const {id, ...fields} = about;
      return await authService.updateById(id!, fields);
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
// update PoliceOffices by id
export const findById = createAsyncThunk (
  "PoliceOffices/findById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find PoliceOffices works
      return await authService.findByID(id);
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

export const AboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.Abouts = [];
      state.singleAbout = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleAbout = {};
      state.message = [];
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      console.log(action.payload);
      state.singleAbout = {
        ...state.singleAbout, 
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
        state.Abouts = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.Abouts = [];
      })
      // ------------------------------------------------------------------ //
      // get All Abouts
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.Abouts = [];
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.Abouts = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Abouts = [];
        state.processDone = false;
        console.log(action.payload);
      })
      // ------------------------------------------------------------------ //
      // update Abouts by id
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
        state.processDone = true;
        state.Abouts = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.Abouts = [];
      })
      // ------------------------------------------------------------------ //
      // find Abouts by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.singleAbout =  action.payload;
        console.log(action.payload)
        state.processDone = false;
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleAbout = null;
        
        console.log(action.payload)
      })
      // ------------------------------------------------------------------ //
      // delete Abouts by id
      // TODO return fix  delete message 
      .addCase(deleteById.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.Abouts = state.Abouts.filter((about : AboutModel)=> about.id !== action.payload)
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Abouts = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = AboutSlice.actions;
export default AboutSlice.reducer;

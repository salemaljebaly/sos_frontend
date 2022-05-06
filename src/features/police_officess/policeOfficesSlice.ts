import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./policeOfficesService";
import { PoliceOfficesState, PolicOfficeModel } from "./policeOfficesModel";

// Get PoliceOffices from local storage
const user = JSON.parse(localStorage.getItem("user")!);
const initialState : PoliceOfficesState = {
  PoliceOffices: [], // check if there is PoliceOffices
  singleOffice : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  processDone : false,
  message: [],
};

// ------------------------------------------------------------------------------------------- //
// Register PoliceOffices
export const add = createAsyncThunk(
  "PoliceOffices/add",
  async (PoliceOffices: PolicOfficeModel, thunkAPI) => {
    try {
      return await authService.add(PoliceOffices, user.access_token.toString());
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
      return await authService.getAll(user.access_token.toString());
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
      return await authService.deleteById(user.access_token.toString(), id);
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
  async (PoliceOfficesData : Partial<PolicOfficeModel>, thunkAPI) => {
    try {
      const {id, ...fields} = PoliceOfficesData;
      return await authService.updateById(user.access_token.toString(), id!, fields);
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
      return await authService.findByID(user.access_token.toString(), id);
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

export const PoliceOfficesSlice = createSlice({
  name: "policeOffices",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.PoliceOffices = [];
      state.singleOffice = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleOffice = {};
      state.message = [];
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      console.log(action.payload);
      state.singleOffice = {
        ...state.singleOffice, 
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
        state.processDone = false;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = true;
        state.PoliceOffices = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.PoliceOffices = [];
      })
      // ------------------------------------------------------------------ //
      // get All PoliceOffices
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.PoliceOffices = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.PoliceOffices = [];
        
        console.log(action.payload);
      })
      // ------------------------------------------------------------------ //
      // update PoliceOffices by id
      // TODO return fix  update message 
      .addCase(updateById.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(updateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.processDone = true;
        state.PoliceOffices = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.PoliceOffices = [];
      })
      // ------------------------------------------------------------------ //
      // find PoliceOffices by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.singleOffice =  action.payload;
        
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleOffice = null;
        
        console.log(action.payload)
      })
      // ------------------------------------------------------------------ //
      // delete PoliceOffices by id
      // TODO return fix  delete message 
      .addCase(deleteById.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.PoliceOffices = state.PoliceOffices.filter((office : PolicOfficeModel)=> office.id !== action.payload)

      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.PoliceOffices = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = PoliceOfficesSlice.actions;
export default PoliceOfficesSlice.reducer;

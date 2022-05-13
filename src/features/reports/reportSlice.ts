import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserModelFromToken } from "../users/userModel";
import authService from "./reporstService";
import { ReportsModel, ReportState } from "./reportsModel";

// Get Reports from local storage
const user = JSON.parse(localStorage.getItem("user")!) as UserModelFromToken;
const initialState : ReportState  = {
  Reports: [], // check if there is Reports
  singleReport : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  processDone : false,
  message: [],
  count : 0
};

// ------------------------------------------------------------------------------------------- //
// Register Reports
export const add = createAsyncThunk(
  "Reports/add",
  async (Reports: ReportsModel, thunkAPI) => {
    try {
      return await authService.add(Reports, user.access_token);
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
// get all Reportss
export const getAll = createAsyncThunk <ReportsModel[], undefined, { state: RootState }>(
  "Reports/getAll",
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
// get all Reportss
export const countAll = createAsyncThunk (
  "Reports/countAll",
  async (_, thunkAPI) => {
    try {
      // TODO get token from redux state not local storage
      return await authService.countAll(user.access_token);
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
// delete Reports by id
export const deleteById = createAsyncThunk (
  "Reports/deleteById",
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
// update Reports by id
export const updateById = createAsyncThunk (
  "Reports/updateById",
  async (ReportsData : Partial<ReportsModel>, thunkAPI) => {
    try {
      const {id, ...fields} = ReportsData;
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
// update Reports by id
export const findById = createAsyncThunk (
  "Reports/findById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find Reports works
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

export const ReportsSlice = createSlice({
  name: "policeOffices",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.Reports = [];
      state.singleReport = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleReport = {};
      state.message = [];
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      
      state.singleReport = {
        ...state.singleReport, 
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
        state.Reports = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.Reports = [];
      })
      // ------------------------------------------------------------------ //
      // get All Reports
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.Reports = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Reports = [];
        
        console.log(action.payload);
      })
      // ------------------------------------------------------------------ //
      // get count Reports
      .addCase(countAll.pending, (state) => {
        state.count = 0;
      })
      .addCase(countAll.fulfilled, (state, action) => {
        state.count = action.payload;
        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(countAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.count = 0;
      })
      // ------------------------------------------------------------------ //
      // update Reports by id
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
        state.Reports = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Reports = [];
      })
      // ------------------------------------------------------------------ //
      // find Reports by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.singleReport =  action.payload;
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleReport = null;
        
        console.log(action.payload)
      })
      // ------------------------------------------------------------------ //
      // delete Reports by id
      // TODO return fix  delete message 
      .addCase(deleteById.pending, (state) => {
        state.isLoading = true;
        state.processDone = false;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.Reports = state.Reports.filter((report : ReportsModel)=> report.id != action.payload)
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Reports = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = ReportsSlice.actions;
export default ReportsSlice.reducer;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import citizenReducer from '../features/citizens/citizensSlice';
import policeOfficesReducer from '../features/police_officess/policeOfficesSlice';
// import snackbarReducer from '../features/components/snackbar';

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    citizen : citizenReducer,
    policeOffices : policeOfficesReducer,
    // snackbar : snackbarReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// features/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthModel {
  email: string,
  password: string
}

interface AuthState {
  token: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: "",
  loading: false,
  error: null,
};

export const login = createAsyncThunk<string, Omit<AuthModel, 'id'>>(
  'auth/login',
  async (credential) => {
    const response = await axios.post<string>('http://localhost:3000/api/auth/login', credential);
    console.log(response);

    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to auth';
      });
  },
});

export const { reducer: authReducer } = authSlice;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

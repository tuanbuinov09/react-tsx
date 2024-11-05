import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { HttpStatusCode } from "axios";

interface ResultModel {
  data: any;
  isSuccess: boolean;
  message: string;
}

interface AuthModel {
  email: string;
  password: string;
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

export const login = createAsyncThunk<ResultModel, Omit<AuthModel, "id">>(
  "auth/login",
  async (credential, thunkApi) => {
    const response = await axios.post<ResultModel>(
      "http://localhost:3000/api/auth/login",
      credential
    );

    if (response.status !== HttpStatusCode.Ok) {
      // return thunkApi.rejectWithValue(response.data.message);
    }

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
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
        console.log(action);
        state.token = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = action.error.message || "Failed to auth";
      });
  },
});

export const { reducer: authReducer } = authSlice;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectTokenLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectTokenError = (state: { auth: AuthState }) =>
  state.auth.error;

import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios, { HttpStatusCode } from "axios";

interface ResultModel {
  data: any;
  isSuccess: boolean;
  message: string;
}

interface LoginModel {
  email: string;
  password: string;
}

interface SignUpModel {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

interface AuthState {
  token: string;
  user: User | null,
  loading: boolean;
  error: string | null;
}


const initialState: AuthState = {
  token: "",
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<ResultModel, Omit<LoginModel, "id">>(
  "auth/login",
  async (credential: LoginModel, { rejectWithValue }) => {
    try {
      const response = await axios.post<ResultModel>(
        "http://localhost:3000/api/auth/login",
        credential
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const signUp = createAsyncThunk<ResultModel, Omit<SignUpModel, "id">>(
  "auth/signUp",
  async (credential: SignUpModel, { rejectWithValue }) => {
    try {
      const response = await axios.post<ResultModel>(
        "http://localhost:3000/api/auth/sign-up",
        credential
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.user = null;
    },
    clearState: () => initialState, // Reset state to initial values
  },
  extraReducers: (builder) => {
    builder
      //Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data;
        console.log('login.fulfilled: ', state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to auth";// action.error.message || "Failed to auth";
      })

      // SignUp cases
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to register";
      });
  },
});

export const { reducer: authReducer } = authSlice;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) =>
  state.auth.error;

export const { logout, clearState } = authSlice.actions;
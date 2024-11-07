import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { HttpStatusCode } from "axios";
import { UserDto } from "../data/dtos/UserDto.ts";
import { ResultModel } from "../data/models/ResultModel.ts";
import { LoginDto } from "../data/dtos/LoginDto.ts";
import { SignUpDto } from "../data/dtos/SignUpDto.ts";
import { buildAuthorizationHeader } from "../utilities/httpUtils.ts";
import { ApiUrl } from "../constants/Environment.ts";
import { UserUpdateDto } from "../data/dtos/UserUpdateDto.ts";

interface AuthState {
  token: string;
  currentUser: UserDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: "",
  currentUser: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<ResultModel, Omit<LoginDto, "id">>(
  "auth/login",
  async (credential: LoginDto, { rejectWithValue }) => {
    try {
      const response = await axios.post<ResultModel>(
        ApiUrl + "/api/auth/login",
        credential
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const signUp = createAsyncThunk<ResultModel, Omit<SignUpDto, "id">>(
  "auth/signUp",
  async (credential: SignUpDto, { rejectWithValue }) => {
    try {
      const response = await axios.post<ResultModel>(
        ApiUrl + "/api/auth/sign-up",
        credential
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<ResultModel, void>(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    const authHeader = buildAuthorizationHeader();

    try {
      const response = await axios.get<ResultModel>(
        ApiUrl + "/api/users/me/info",
        {
          headers: {
            ...authHeader,
          },
        }
      );

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const updateCurrentUser = createAsyncThunk<ResultModel, UserUpdateDto>(
  "users/updateCurrentUser",
  async (userUpdateDto: UserUpdateDto, { rejectWithValue }) => {
    const authHeader = buildAuthorizationHeader();
    try {
      const response = await axios.put<ResultModel>(
        ApiUrl + "/api/users/me/info",
        userUpdateDto,
        {
          headers: {
            ...authHeader,
          },
        }
      );

      if (response.status === HttpStatusCode.Unauthorized) {
        return rejectWithValue("Unauthorized");
      }

      if (!response.data.isSuccess) {
        return rejectWithValue(response.data.message);
      }

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = "";
      state.currentUser = null;
    },
    clearAuthState: () => initialState, // Reset state to initial values
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
        console.log("login.fulfilled: ", state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to auth"; // action.error.message || "Failed to auth";
      })

      // SignUp cases
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to register";
      })

      //get current user cases
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.currentUser = action.payload.data;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; //action.error.message || "Failed to fetch user";
      })

      //updateCurrentUser cases
      .addCase(updateCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; //action.error.message || "Failed to fetch users";
      });
  },
});

export const { reducer: authReducer } = authSlice;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.currentUser;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export const { signOut, clearAuthState } = authSlice.actions;

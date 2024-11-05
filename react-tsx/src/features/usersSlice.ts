import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { buildAuthorizationHeader } from "../utilities/httpUtils";

interface ResultModel {
  data: any;
  isSuccess: boolean;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface UsersState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<ResultModel, void>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    const authHeader = buildAuthorizationHeader();
    try {
      const response = await axios.get<ResultModel>("http://localhost:3000/api/users", {
        headers: {
          ...authHeader
        }
      });

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


export const fetchCurrentUser = createAsyncThunk<ResultModel, void>(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    const authHeader = buildAuthorizationHeader();
    console.log(authHeader);

    try {
      const response = await axios.get<ResultModel>(`http://localhost:3000/api/users/me/info`, {
        headers: {
          ...authHeader
        }
      });

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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //users cases
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })

      //1 user cases
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.user = action.payload.data;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { reducer: usersReducer } = usersSlice;
export const selectUsers = (state: { users: UsersState }) => state.users.users;
export const selectUser = (state: { users: UsersState }) => state.users.user;
export const selectLoading = (state: { users: UsersState }) =>
  state.users.loading;
export const selectError = (state: { users: UsersState }) => state.users.error;

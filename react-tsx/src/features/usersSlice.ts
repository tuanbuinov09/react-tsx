import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { HttpStatusCode } from "axios";
import { buildAuthorizationHeader } from "../utilities/httpUtils";
import { User } from "../data/models/User";
import { ResultModel } from "../data/models/ResultModel";

interface UsersState {
  user: User;
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  user: {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
  },
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<ResultModel, void>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    const authHeader = buildAuthorizationHeader();
    try {
      const response = await axios.get<ResultModel>(
        "http://localhost:3000/api/users",
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

export const fetchCurrentUser = createAsyncThunk<ResultModel, void>(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    const authHeader = buildAuthorizationHeader();

    try {
      const response = await axios.get<ResultModel>(
        `http://localhost:3000/api/users/me/info`,
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
        state.error = action.payload as string; //action.error.message || "Failed to fetch users";
      })

      //1 user cases
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.user = action.payload.data;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; //action.error.message || "Failed to fetch user";
      });
  },
});

export const { reducer: usersReducer } = usersSlice;
export const selectUsers = (state: { users: UsersState }) => state.users.users;
export const selectUser = (state: { users: UsersState }) => state.users.user;
export const selectLoading = (state: { users: UsersState }) =>
  state.users.loading;
export const selectError = (state: { users: UsersState }) => state.users.error;

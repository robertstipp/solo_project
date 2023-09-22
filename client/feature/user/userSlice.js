import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { userAPI } from "./userAPI";


export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getUser();
      if (data) {
        console.log(data)
        return data.user
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  userInfo: null,
  status: "idle",
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state, action) {
      state.userInfo = null;
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

const { actions, reducer } = userSlice;

export const { logoutUser } = actions;

export default reducer;

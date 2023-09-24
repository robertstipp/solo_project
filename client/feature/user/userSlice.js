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
export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getMe();
      if (data) {
        console.log(data)
        return data.user
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTopTracks = createAsyncThunk(
  "user/getTopTracks",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getTopTracks();
      if (data) {
        const genreSet = new Set();
        for (const item of data.items) {
          const genreArr = item.genres
          genreSet.add(...genreArr)
        }
        return Array.from(genreSet)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getDailyTracks = createAsyncThunk(
  "user/getDailyTracks",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getDailyTracks();
      const trackSet = new Set()
      console.log(data)
      if (data) {
        for (const item of data.items) {
          trackSet.add(item.track.name)
        }
        
        return Array.from(trackSet)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
  userInfo: null,
  status: "idle",
  error: null,
  genres: [],
  dailyTracks: [],
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
      })
      .addCase(getMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTopTracks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopTracks.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        state.genres = action.payload
      })
      .addCase(getTopTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getDailyTracks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDailyTracks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dailyTracks = action.payload
      })
      .addCase(getDailyTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

const { actions, reducer } = userSlice;

export const { logoutUser } = actions;

export default reducer;

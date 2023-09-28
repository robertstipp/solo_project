import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { userAPI } from "./userAPI";



export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getUser();
      if (data) {
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
        return data
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTopGenres = createAsyncThunk(
  "user/getTopGenres",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getTopArtists();
      
      if (data) {
        
        const genreSet = new Set()
        const genreCount = {}
        const genres = data.items.map((item)=>item.genres)
        const filtered = genres.filter((genre) => genre.length !== 0)
        for (const arr of filtered) {
          for (const genre of arr) {
            if (genreCount[genre] === undefined) {
              genreCount[genre] = 0
            }
            genreCount[genre] += 1
            genreSet.add(genre)
          }
        } 
        const topArtists = data.items.slice(0,3)
        const genreArr = []
        for (const [genre,count] of Object.entries(genreCount)) genreArr.push([genre,count]) 
        genreArr.sort((a,b)=> b[1] - a[1])
        const topGenres = genreArr.map((el)=>el[0]).slice(0,3)
        return {genreSet:Array.from(genreSet), genresCount: genreCount, topArtists: topArtists, topGenres: topGenres}
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
        return data.items.slice(0,3)
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
      const tracks = []
      
      if (data) {
        for (const item of data.items) {
          const track = {
            trackName: item.track.name,
            popularity: item.track.popularity,
            artist:  item.track.artists.map((artist)=>artist.name).join(", "),
            img: item.track.album.images[2].url
          }
          if (!trackSet.has(item.track.name)) {
            trackSet.add(item.track.name)
            tracks.push(track)
          }
          
        }
        // console.log(tracks)
        return tracks
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserAnalysis = createAsyncThunk(
  "user/getUserAnalysis",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.getUserProfileAnalysis();
      console.log(data)  
      return {
        acousticness: data.acousticness.toFixed(2), 
        danceability: data.danceability.toFixed(2), 
        energy: data.energy.toFixed(2), 
        tempo: data.tempo.toFixed(2),
        speechiness: data.speechiness.toFixed(2),
        valence: data.valence.toFixed(2),
        instrumentalness: data.valence.toFixed(2),
        mode: data.valence.toFixed(2)
      }
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const initialState = {
  userInfo: null,
  userCredentials: null,
  status: "idle",
  error: null,
  genres: [],
  genresCount: null,
  dailyTracks: [],
  userAnalysis: null,
  topArtists: [],
  topTracks: [],
  topGenres: [],
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
        state.userCredentials = action.payload;
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
      .addCase(getTopGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genres = action.payload.genreSet
        state.genresCount = action.payload.genresCount
        state.topArtists = action.payload.topArtists
        state.topGenres = action.payload.topGenres
      })
      .addCase(getTopGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getTopTracks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopTracks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topTracks = action.payload
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
      })
      .addCase(getUserAnalysis.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAnalysis.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAnalysis = action.payload
      })
      .addCase(getUserAnalysis.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

const { actions, reducer } = userSlice;

export const { logoutUser } = actions;

export default reducer;

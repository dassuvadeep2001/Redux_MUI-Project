// features/artistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import base_url, { end_url } from '../../api/api';
import axios from 'axios';


let artistapi= base_url+end_url.artist;
console.log(artistapi);

const initialState = {
  artists: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};


export const fetchArtists = createAsyncThunk('artists/fetchArtists', async (artistData) => {
  const res = await axios.get(artistapi, artistData);
  console.log("axios response from artist page", res)
  return res?.data;
});

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched artists to the array
        state.artists = action.payload;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const selectAllArtists = (state) => state.artists.artists;
// export const getArtistsStatus = (state) => state.artists.status;
// export const getArtistsError = (state) => state.artists.error;

export default artistSlice.reducer;

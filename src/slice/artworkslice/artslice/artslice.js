import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import base_url, { end_url } from '../../../api/api';

let artApi = base_url + end_url.art; // Update the URL for the reviews API
console.log(artApi);

const initialState = {
    isLoading: false,
    art: [],
    error: null,
    status:0,
    artPage:null,
    artpageStatus:"idle",
    artpageError:null
};

// Async thunk to fetch art
export const fetchArt = createAsyncThunk('art/fetchArt', async () => {
  const res = await axios.get(artApi);
  console.log("axios response from artpage", res);
  return res?.data;
});

// Async thunk to fetch art by type
export const fetchArtByType = createAsyncThunk('art/fetchArtByType', async (type) => {
    const res = await axios.get(`${artApi}?type=${type}`); // Update API endpoint to fetch by type
    console.log("axios response from fetching art by type", res);
    return res?.data;
});

// Async thunk to post art
export const postArt = createAsyncThunk('reviews/postArt', async (artData) => {
  const res = await axios.post(artApi, artData);
  console.log("axios response from posting art", res);
  return { data: res.data, status: res.status }; // Assuming the API returns the created review
});

// Async thunk to delete art
export const deleteArt = createAsyncThunk('art/deleteArt', async (artId) => {
  const res = await axios.delete(`${artApi}/${artId}`);
  console.log("axios response from deleting art", res);
  return { id: artId, status: res.status }; // Returning artId to remove from local state
});


const artSlice = createSlice({
  name: 'art',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Handle fetch art
      builder.addCase(fetchArt.pending, (state) => {
        state.artpageStatus = 'loading';
        state.artpageError = null;
      });
      builder.addCase(fetchArt.fulfilled, (state, action) => {
        state.artpageStatus = 'succeeded';
        state.art = action.payload;
        state.artpageError = null;
      });
      builder.addCase(fetchArt.rejected, (state, action) => {
        state.artpageStatus = 'failed';
        state.artpageError = action.error.message;
      });

       // Handle fetch art by type
       builder.addCase(fetchArtByType.pending, (state) => {
        state.artpageStatus = 'loading';
        state.artpageError = null;
    })
    builder.addCase(fetchArtByType.fulfilled, (state, action) => {
        state.artpageStatus = 'succeeded';
        state.art = action.payload; // Replace with filtered art
        state.artpageError = null;
    })
    builder.addCase(fetchArtByType.rejected, (state, action) => {
        state.artpageStatus = 'failed';
        state.artpageError = action.error.message;
    });

      // Handle post review
      builder.addCase(postArt.pending, (state) => {
        state.isLoading = true
      });
      builder.addCase(postArt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artPage = action.payload.data; 
        state.error = null;
        state.status=action.payload.status
        console.log("response review reducer",action.payload)
      })
      .addCase(postArt.rejected, (state, action) => {
        state.isLoading = false;
        state.artPage= null;
        state.error = action.error.message;
      });
      // Handle delete art
    builder.addCase(deleteArt.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteArt.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.art = state.art.filter((item) => item.id !== action.payload.id); // Remove deleted art from state
      console.log("Artwork deleted successfully", action.payload);
    });
    builder.addCase(deleteArt.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      console.warn("Failed to delete artwork:", action.error.message);
    });
  },
});

export default artSlice.reducer;
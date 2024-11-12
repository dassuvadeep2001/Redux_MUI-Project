import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import base_url, { end_url } from '../../../api/api';

// Define the API URL
const categoryapi = base_url+end_url.category; // Replace with your actual API URL
// console.log(categoryapi);

// Create an async thunk for fetching art categories
export const fetchArtCategories = createAsyncThunk('artCategory/fetchArtCategories', async (categoryData) => {
  const response = await axios.get(categoryapi, categoryData);
  console.log("response for category from axios", response);
  return response?.data;
});

// Create the slice
const artCategorySlice = createSlice({
  name: 'artCategory',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArtCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched categories to the array
        state.categories = action.payload;
        console.log(action.payload);
        
      })
      .addCase(fetchArtCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


// Export the reducer
export default artCategorySlice.reducer;

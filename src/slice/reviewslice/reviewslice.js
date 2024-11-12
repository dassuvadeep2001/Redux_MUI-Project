import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import base_url, { end_url } from '../../api/api';

let reviewApi = base_url + end_url.review; // Update the URL for the reviews API
console.log(reviewApi);

const initialState = {
    isLoading: false,
    reviews: [],
    error: null,
    status:0,
    reviewUser:null,
    reviewProfile:"idle",
    profileError:null
};

// Async thunk to fetch reviews
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const res = await axios.get(reviewApi);
  console.log("axios response from review page", res);
  return res?.data;
});

// Async thunk to post a review
export const postReview = createAsyncThunk('reviews/postReview', async (reviewData) => {
  const res = await axios.post(reviewApi, reviewData);
  console.log("axios response from posting review", res);
  return { data: res.data, status: res.status }; // Assuming the API returns the created review
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Handle fetch reviews
      builder.addCase(fetchReviews.pending, (state) => {
        state.reviewProfile = 'loading';
        state.profileError = null;
      });
      builder.addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewProfile = 'succeeded';
        // Add fetched reviews to the array
        state.reviews = action.payload;
        state.profileError = null;
      });
      builder.addCase(fetchReviews.rejected, (state, action) => {
        state.reviewProfile = 'failed';
        state.profileError = action.error.message;
      })
      // Handle post review
      builder.addCase(postReview.pending, (state) => {
        state.isLoading = true
      });
      builder.addCase(postReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewUser = action.payload.data; 
        state.error = null;
        state.status=action.payload.status
        console.log("response review reducer",action.payload)
      })
      .addCase(postReview.rejected, (state, action) => {
        state.isLoading = false;
        state.reviewUser = null;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;

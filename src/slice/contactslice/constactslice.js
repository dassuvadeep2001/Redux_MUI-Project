import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import base_url, { end_url } from '../../api/api';


let contactApi = base_url + end_url.contact; // Update the URL for the reviews API
console.log(contactApi);


// Async thunk to fetch queries
export const fetchQueries = createAsyncThunk('queries/fetchQueries',async () => {
    const response = await axios.get(contactApi);
    return response.data;
  }
);

// Async thunk to post a new query
export const postQuery = createAsyncThunk('queries/postQuery',async (newQuery) => {
    const response = await axios.post(contactApi, newQuery);
    return response.data;
  }
);

export const queriesSlice = createSlice({
  name: 'queries',
  initialState: {
    isLoading: false,
    queries: [],
    error: null,
    status:0,
    sender:null,
    senderProfile:"idle",
    profileError:null
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch queries
    builder
      .addCase(fetchQueries.pending, (state) => {
        state.senderProfile = 'loading';
        state.profileError = null;
      })
      .addCase(fetchQueries.fulfilled, (state, action) => {
        state.senderProfile = 'succeeded';
        // Add fetched reviews to the array
        state.queries = action.payload;
        state.profileError = null;
      })
      .addCase(fetchQueries.rejected, (state, action) => {
        state.senderProfile = 'failed';
        state.profileError = action.error.message;
      });

    // Post a new query
    builder
      .addCase(postQuery.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sender = action.payload; 
        state.error = null;
        state.status=action.payload.status
        console.log("response from contactslice",action.payload)
      })
      .addCase(postQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.sender = null;
        state.error = action.error.message;
      });
  }
});

export default queriesSlice.reducer;

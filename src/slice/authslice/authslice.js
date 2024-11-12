import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import base_url, { end_url } from "../../api/api";
import axios from "axios";

let loginapi = base_url + end_url.user;
let regapi = base_url + end_url.user;
let profileapi = base_url + end_url.user;

// Registration
export const userReg = createAsyncThunk("user/userReg", async (userData, {rejectWithValue}) => {
  const { data: existingUsers } = await axios.get(regapi);
    const emailExists = existingUsers.find(
      (user) => user.email === userData.email
    );
    const usernameExists = existingUsers.find(
      (user) => user.username === userData.username
    );

    if (emailExists) {
      return rejectWithValue("Email already exists. Please use another email.");
    }

    if (usernameExists) {
      return rejectWithValue(
        "Username already exists. Please use another username."
      );
    }
  const {data} = await axios.post(regapi, userData);
  return data;
});

// Login
export const userLogin = createAsyncThunk("user/userLogin", async (userData) => {
  const response = await axios.get(loginapi);
  const users = response.data;
  const matchedUser = users.find(
    (user) => user.email === userData.email && user.password === userData.password
  );

  if (matchedUser) {
    localStorage.setItem("userId", matchedUser.id);
    localStorage.setItem("userImage", matchedUser.image);
    localStorage.setItem("Username", matchedUser.username);
    localStorage.setItem("userType", matchedUser.usertype);
    return matchedUser;
  } else {
    throw new Error("Invalid credentials");
  }
});

// Profile
export const userProfile = createAsyncThunk("user/userProfile", async (userId) => {
  const res = await axios.get(`${profileapi}/${userId}`);
  return res?.data;
});

// Edit Profile
export const userEditProfile = createAsyncThunk(
  "user/userEditProfile",
  async ({ userId, updatedData }) => {
    const res = await axios.put(`${profileapi}/${userId}`, updatedData);
    return res.data;
  }
);

const initialValue = {
  isLoading: false,
  userValue: [],
  error: null,
  status: 0,
  user: null,
  profileStatus: "idle",
  profileError: null,
  editStatus: "idle",
  editError: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    // Registration reducers
    builder.addCase(userReg.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userReg.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.error = null;
      state.status = action.payload.status;
    });
    builder.addCase(userReg.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.error.message;
    });

    // Login reducers
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.error.message;
    });

    // Profile reducers
    builder.addCase(userProfile.pending, (state) => {
      state.profileStatus = "loading";
      state.profileError = null;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.profileStatus = "succeeded";
      state.userValue = action.payload;
      state.profileError = null;
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.profileStatus = "failed";
      state.profileError = action.error.message;
    });

    // Edit Profile reducers
    builder.addCase(userEditProfile.pending, (state) => {
      state.editStatus = "loading";
      state.editError = null;
    });
    builder.addCase(userEditProfile.fulfilled, (state, action) => {
      state.editStatus = "succeeded";
      state.userValue = action.payload; // Update the user data with the edited profile data
      state.editError = null;
    });
    builder.addCase(userEditProfile.rejected, (state, action) => {
      state.editStatus = "failed";
      state.editError = action.error.message;
    });
  },
});

export default authSlice.reducer;

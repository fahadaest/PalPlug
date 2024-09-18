import { createSlice } from '@reduxjs/toolkit';
import { submitProfile } from '../../action';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    accessToken: null,
    currentStep: 1,
    servicescurrentStep:1,
    profileSubmissionStatus: null, 
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      localStorage.removeItem('user'); 
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload)); 
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload; 
    },
    setServicesCurrentStep: (state, action) => {
      state.servicescurrentStep = action.payload; 
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(submitProfile.pending, (state) => {
        state.loading = true;
        state.profileSubmissionStatus = 'pending';
      })
      .addCase(submitProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileSubmissionStatus = 'success';
        state.user = action.payload; 
      })
      .addCase(submitProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.profileSubmissionStatus = 'failed';
      });
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, setUser, setCurrentStep, setServicesCurrentStep } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest, putRequest } from '@/axios/index';

export const submitResumeData = createAsyncThunk(
  'resume/submitResumeData',
  async ({ email, fileName, fileSize, linkedInUrl, portfolioLink }, { rejectWithValue }) => {
    try {
      const payload = {
        work_email: email,
        resume_file_name: fileName,
        resume_file_size: fileSize,
        linkedin_url: linkedInUrl,
        portfolio_url: portfolioLink,
      };
      const response = await postRequest(`submit-profile/2/?work_email=${encodeURIComponent(email)}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    fileName: '',
    fileSize: '',
    linkedInUrl: '',
    portfolioLink: '',
    file: null,
    loading: false,
    error: null,
  },
  reducers: {
    saveResume: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    clearResume: (state) => {
      state.fileName = '';
      state.fileSize = '';
      state.linkedInUrl = '';
      state.portfolioLink = '';
      state.file = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitResumeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitResumeData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitResumeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { saveResume, clearResume } = resumeSlice.actions;
export const selectResume = (state) => state.resume;
export default resumeSlice.reducer;
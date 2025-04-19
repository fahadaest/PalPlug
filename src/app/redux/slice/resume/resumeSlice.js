import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    fileName: '',
    fileSize: '',
    linkedInUrl: '',
    portfolioLink: '',
    file: null, 
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
  }
});

export const { saveResume, clearResume } = resumeSlice.actions;
export const selectResume = (state) => state.resume;
export default resumeSlice.reducer;
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest, postRequest } from '@/axios/index'; 
import { getRoute } from '@/api/index'; 

export const submitProfile = createAsyncThunk(
  'user/submitProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const route = getRoute('submitProfile'); 
      const response = await postRequest(route, profileData, true); 
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const submitAllServices = createAsyncThunk(
  'services/submitAllServices/',
  async (servicesData, { rejectWithValue }) => {
    try {
      const route = getRoute('submitAllServices'); 
      const response = await postRequest(route, servicesData, true); 
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCountries = createAsyncThunk(
    'data/fetchCountries',
    async () => {
        return getRequest(getRoute('countriesList'));
    }
);

export const fetchCompanies = createAsyncThunk(
  'fetchCompanies',
  async () => {
    return getRequest(getRoute('getCompanies'));
  }
);
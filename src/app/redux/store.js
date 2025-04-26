import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/app/redux/slice/apislice/apislice.js';
import companiesReducer from '@/app/redux/slice/companies/companiesSlice';
import employeesReducer from '@/app/redux/slice/employee/employeeSlice';
import userReducer, { setUser } from '@/app/redux/slice/user/userSlice';
import countriesReducer from '@/app/redux/slice/country/countrySlice';
import serviceSlice from './slice/servicespublish/serviceSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import collegeReducer from '@/app/redux/slice/colleges/collegeSlice';
import yearReducer from '@/app/redux/slice/year/yearSlice';
import userRolesReducer from '@/app/redux/slice/userRoles/userRolesSlice';
import profileSubmitReducer from '@/app/redux/slice/submitProfileData/profileSubmitSlice';
import resumeReducer from './slice/resume/resumeSlice';
import userDetailsReducer from './slice/user/userDetailsSlice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    employees: employeesReducer,
    countries: countriesReducer,
    services: serviceSlice,
    resume: resumeReducer,
    user: userReducer,
    colleges: collegeReducer, 
    years: yearReducer,
    userRoles: userRolesReducer,
    profileSubmit: profileSubmitReducer,
    userDetails: userDetailsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, 
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
});
setupListeners(store.dispatch)
if (typeof window !== 'undefined') {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      store.dispatch(setUser(parsedUserData));
    }
  } catch (error) {
    console.log('Error loading user data from localStorage:', error);
  }
}

export default store;


import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/app/redux/slice/apislice.js';// Import the API slice
import companiesReducer from '@/app/redux/slice/companies/companiesSlice';
import employeesReducer from '@/app/redux/slice/employee/employeeSlice';
import userReducer, { setUser } from '@/app/redux/slice/user/userSlice';
import countriesReducer from '@/app/redux/slice/country/countrySlice';
import serviceSlice from './slice/servicespublish/serviceSlice';



export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    employees: employeesReducer,
    user: userReducer,
    countries: countriesReducer,
    services: serviceSlice, 
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Include Redux Toolkit Query reducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add middleware for RTK Query
});


if (typeof window !== 'undefined') {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      store.dispatch(setUser(parsedUserData));
    }
  } catch (error) {
    console.error('Error loading user data from localStorage:', error);
  }
}

export default store;

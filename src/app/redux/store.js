
import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '@/app/redux/slice/companies/companiesSlice';
import employeesReducer from '@/app/redux/slice/employee/employeeSlice';
import userReducer, { setUser } from '@/app/redux/slice/user/userSlice';
import countriesReducer from '@/app/redux/slice/country/countrySlice';
import serviceSlice from './slice/servicespublish/serviceSlice';
import resumeReducer from './slice/resume/resumeSlice';


export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    employees: employeesReducer,
    user: userReducer,
    countries: countriesReducer,
    services: serviceSlice,
    resume: resumeReducer,
  },
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

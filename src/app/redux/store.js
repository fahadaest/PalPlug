import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '@/app/redux/slice/companies/companiesSlice';
import employeesReducer from '@/app/redux/slice/employee/employeeSlice';
import userReducer from '@/app/redux/slice/user/userSlice';

export const store = configureStore({
    reducer: {
        companies: companiesReducer,
        employees: employeesReducer,
        user: userReducer,
    },
});

export default store;

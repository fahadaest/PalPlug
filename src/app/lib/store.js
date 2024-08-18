import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '@/app/lib/features/companies/companiesSlice';
import employeesReducer from '@/app/lib/features/employee/employeeSlice';
import userReducer from '@/app/lib/features/user/userSlice';

export const store = configureStore({
    reducer: {
        companies: companiesReducer,
        employees: employeesReducer,
        user: userReducer,
    },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '@/app/lib/features/companies/companiesSlice';
import employeesReducer from '@/app/lib/features/employee/employeeSlice';

export const store = configureStore({
    reducer: {
        companies: companiesReducer,
        employees: employeesReducer,
    },
});

export default store;

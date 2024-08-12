import { createSlice } from '@reduxjs/toolkit';
import MaleImg from '@/assets/images/male.svg';
import Image from 'next/image';
import FemaleImg from '@/assets/images/female.svg';
import FemaleImg2 from '@/assets/images/femal2.png';
const initialState = {
    employees: [
        {
            id: 1,
            name: 'Idris Gettani',
            role: 'Partner Success @ Airbnb',
            city: 'San Francisco, CA',
            reviews: 4.9,
            hires: '12 successful hires',
            country: 'USA',
            yearsOfService: 5,
            referrals: 10,
            interviews: 20,
            image: MaleImg,
        },
        {
            id: 2,
            name: 'Maddy Grey',
            role: 'Software Engineer II @ Airbnb',
            city: 'San Francisco, CA',
            reviews: 4.75,
            hires: '8 successful hires',
            country: 'USA',
            yearsOfService: 3,
            referrals: 8,
            interviews: 15,
            image: FemaleImg,
        },
        {
            id: 3,
            name: 'Angela Wynn',
            role: 'Marketing @ Airbnb',
            city: 'San Francisco, CA',
            reviews: 4.78,
            hires: '8 successful hires',
            country: 'USA',
            yearsOfService: 3,
            referrals: 8,
            interviews: 15,
            image: FemaleImg2,
        },
    ],
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        //TODO:ADDED WITH APIS
    },
});

export const selectEmployees = (state) => state.employees.employees;
export default employeeSlice.reducer;

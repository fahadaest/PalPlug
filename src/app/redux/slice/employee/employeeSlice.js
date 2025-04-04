import { createSlice } from '@reduxjs/toolkit';
import MaleImg from '@/assets/images/male.svg';
import Image from 'next/image';
import FemaleImg from '@/assets/images/female.svg';
import FemaleImg2 from '@/assets/images/femal2.png';

const generateCalendlyLink = (name) => `https://calendly.com/${name.toLowerCase().replace(/\s+/g, '-')}`;

const initialState = {
    employees: [
        {
            id: 1,
            name: 'Idris Gettani',
            role: 'Partner Success @ Airbnb',
            city: 'San Francisco, CA',
            reviews: 4.9,
            totalReviews:212,
            hires: '12 successful hires',
            country: 'USA',
            yearsOfService: 5,
            referrals: 10,
            interviews: 20,
            image: MaleImg,
            get calendlyLink() {
                return generateCalendlyLink(this.name);
            },
            about: "Whatever the role, I know that I'll always stay true to my favorite Haas School of Business defining principle ~ Student Always.",
            services: [
                {
                    title: 'Referral',
                    description: 'Video screening required',
                    price: 10.00,
                    reviewsCount: 3,
                    package:"Employee referral to Netflix. Video call required to determine if candidate is a good fit for the position. Once accepted, you will receive a referral confirmation (You are not guaranteed to receive an offer from Netflix)."
                },
                {
                    title: 'Resume Review',
                    description: 'Video screening required',
                    price: 18.00,
                    reviewsCount: 9,
                    package: "Employee will schedule a 30 min call to give feedback on your attached resume and how to improve it. This package comes with one additional follow-up review."
                },
                {
                    title: 'Interview Prep',
                    description: 'Video screening required',
                    price: 41.00,
                    reviewsCount: 2,
                    package:"Employee will schedule a 30 min call to help you prepare for an upcoming interview."
                }
            ],
        },
        {
            id: 2,
            name: 'Maddy Grey',
            role: 'Software Engineer II @ Airbnb',
            city: 'San Francisco, CA',
            reviews: 4.75,
            totalReviews:213,
            hires: '8 successful hires',
            country: 'USA',
            yearsOfService: 3,
            referrals: 8,
            interviews: 15,
            image: FemaleImg,
            get calendlyLink() {
                return generateCalendlyLink(this.name);
            },
            about: "Whatever the role, I know that I'll always stay true to my favorite Haas School of Business defining principle ~ Student Always.",
            services: [
                {
                    title: 'Referral',
                    description: 'Video screening required',
                    price: 21.00,
                    reviewsCount: 7,
                    package:"Employee referral to Netflix. Video call required to determine if candidate is a good fit for the position. Once accepted, you will receive a referral confirmation (You are not guaranteed to receive an offer from Netflix)."
                },
                {
                    title: 'Resume Review',
                    description: 'Video screening required',
                    price: 25.00,
                    reviewsCount: 6,
                    package: "Employee will schedule a 30 min call to give feedback on your attached resume and how to improve it. This package comes with one additional follow-up review."
                },
                {
                    title: 'Interview Prep',
                    description: 'Video screening required',
                    price: 21.00,
                    reviewsCount: 4,
                },
            ],
        },
        {
            id: 3,
            name: 'Angela Wynn',
            role: 'Systems Engineering @ Airbnb',
            city: 'San Francisco, CA',
            reviews: 4.78,
            totalReviews:214,
            hires: '8 successful hires',
            country: 'USA',
            yearsOfService: 3,
            referrals: 8,
            interviews: 15,
            image: FemaleImg2,
            get calendlyLink() {
                return generateCalendlyLink(this.name);
            },
            about: "Whatever the role, I know that I'll always stay true to my favorite Haas School of Business defining principle ~ Student Always.",
            services: [
                {
                    title: 'Referral',
                    description: 'Video screening required',
                    price: 21.00,
                    reviewsCount: 8,
                    package:"Employee referral to Netflix. Video call required to determine if candidate is a good fit for the position. Once accepted, you will receive a referral confirmation (You are not guaranteed to receive an offer from Netflix)."
                },
                {
                    title: 'Resume Review',
                    description: 'Video screening required',
                    price: 45.00,
                    reviewsCount: 2,
                    package: "Employee will schedule a 30 min call to give feedback on your attached resume and how to improve it. This package comes with one additional follow-up review."
                },
                {
                    title: 'Interview Prep',
                    description: 'Video screening required',
                    price: 20.00,
                    reviewsCount: 2,
                },
            ],
        },
    ],
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
    },
});

export const selectEmployees = (state) => state.employees.employees;
export default employeeSlice.reducer;

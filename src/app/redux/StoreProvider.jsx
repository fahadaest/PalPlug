'use client';
import { Lemonada, Tomorrow } from 'next/font/google';
import store from './store';

const { Provider } = require('react-redux');

export const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};



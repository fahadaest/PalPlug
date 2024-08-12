'use client';
import store from './lib/store';

const { Provider } = require('react-redux');

export const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

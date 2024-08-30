'use client';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { StoreProvider } from './redux/StoreProvider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '@/app/utils/firebase';
import { logout, setUser } from '@/app/redux/slice/user/userSlice';


const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

function AuthProvider({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(
                    setUser({
                        displayName: user.displayName,
                        email: user.email,
                    })
                );
            } else {
                dispatch(logout());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return children;
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <StoreProvider>
                    <AuthProvider>
                        <Navbar />
                        <main>{children}</main>
                    </AuthProvider>
                </StoreProvider>
            </body>
        </html>
    );
}

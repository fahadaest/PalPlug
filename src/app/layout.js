'use client';

import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { StoreProvider } from './redux/StoreProvider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '@/app/utils/firebase';
import { logout, setUser } from '@/app/redux/slice/user/userSlice';
import { usePathname } from 'next/navigation';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoUrl:  user.photoURL,
        };
        dispatch(setUser(userData));
        // Store user data in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        dispatch(logout());
        // Remove user data from localStorage on logout
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Restore user session from localStorage on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
      }
    }
  }, [dispatch]);

  return children;
}

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarPaths = ['/refPayment'];

  const shouldHideNavbar = hideNavbarPaths.some(path => pathname?.startsWith(path));

  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          <AuthProvider>
            {!shouldHideNavbar && <Navbar />}
            <main>{children}</main>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
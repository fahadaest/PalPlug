'use client';

import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { StoreProvider } from './redux/StoreProvider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '@/app/utils/firebase';
import { logout, setUser } from '@/app/redux/slice/user/userSlice';
import { fetchUserDetailsByEmail } from '@/app/redux/slice/user/userDetailsSlice';
import { usePathname } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

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
        dispatch(fetchUserDetailsByEmail(user.email)); 
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        dispatch(logout());
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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
            <Elements stripe={stripePromise}>
              {!shouldHideNavbar && <Navbar />}
              <main>{children}</main>
            </Elements>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { StoreProvider } from './StoreProvider';

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <StoreProvider>
                    <Navbar />
                    <main>{children}</main>
                </StoreProvider>
            </body>
        </html>
    );
}

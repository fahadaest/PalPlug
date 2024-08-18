import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// const firebaseConfig = {
//     apiKey: 'AIzaSyBsf9WTQidxGptNxbR9XQGYpbW4cUy_yaU',
//     authDomain: 'palplug-next.firebaseapp.com',
//     projectId: 'palplug-next',
//     storageBucket: 'palplug-next.appspot.com',
//     messagingSenderId: '1058697352211',
//     appId: '1:1058697352211:web:65beb7ee477b294e9c5be6',
//     measurementId: 'G-YPHLZ9QXB8',
// };
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';


// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };






//Anas Najmi firebase configuration file 
// const firebaseConfig = {
//     apiKey: "AIzaSyDlpkk7fuwty63v4JpHZahBpbbqnfhsTRA",
//     authDomain: "palplug-a6280.firebaseapp.com",
//     projectId: "palplug-a6280",
//     storageBucket: "palplug-a6280.firebasestorage.app",
//     messagingSenderId: "497232380907",
//     appId: "1:497232380907:web:de49d90ab4ae7e5f5a0fae"
//   };






const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth};

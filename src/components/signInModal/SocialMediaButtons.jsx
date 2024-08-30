import React from 'react';
import Image from 'next/image';
import GoogleIcon from '@/assets/images/socialicon1.svg';
import GithubIcon from '@/assets/images/sociaicon3.svg';
import LinkedInIcon from '@/assets/images/socialIcon2.svg';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
} from '@/app/redux/slice/user/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from '@/app/utils/firebase';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

const Button = ({ icon, children, handleClick, className }) => {
    return (
        <button
            onClick={handleClick}
            className={`flex text-primary font-semibold items-center justify-left w-full py-3 px-4 border rounded-lg ${className}`}
        >
            <Image
                src={icon}
                alt="Icon"
                width={24}
                height={24}
                className="mr-4"
            />
            {children}
        </button>
    );
};

const GoogleButton = () => {
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = async () => {
        dispatch(loginRequest());
        try {
            const result = await signInWithPopup(auth, provider);
            dispatch(loginSuccess(result?.user));
        } catch (error) {
            dispatch(loginFailure(error?.message || 'Something went wrong!'));
        }
    };

    return (
        <Button
            className="bg-[#5186EC]"
            icon={GoogleIcon}
            handleClick={handleGoogleSignIn}
        >
            Sign in with Google
        </Button>
    );
};

const LinkedInButton = () => {
    const dispatch = useDispatch();
    const { linkedInLogin } = useLinkedIn({
        clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
        scope: process.env.NEXT_PUBLIC_LINKEDIN_SCOPE,
        redirectUri: `${typeof window === 'object' && window.location.origin}/linkedin`,

        onSuccess: async (code) => {
            dispatch(loginRequest());
            //TODO: Will add configration after the success response
            console.log('code', code);
        },

        onError: (error) => {
            dispatch(
                loginFailure(error?.errorMessage || 'LinkedIn login failed')
            );
        },
    });

    return (
        <Button
            className="bg-[#0A66C2]"
            icon={LinkedInIcon}
            handleClick={() => linkedInLogin()}
        >
            Sign in with LinkedIn
        </Button>
    );
};

const GithubButton = () => {
    const dispatch = useDispatch();
    const handleGithubSignIn = async () => {
        const provider = new GithubAuthProvider();

        dispatch(loginRequest());
        try {
            const result = await signInWithPopup(auth, provider);
            dispatch(loginSuccess(result?.user));
        } catch (error) {
            dispatch(loginFailure(error?.message || 'Something went wrong!'));
        }
    };

    return (
        <Button
            className="bg-[#1B1817]"
            icon={GithubIcon}
            handleClick={handleGithubSignIn}
        >
            Sign in with Github
        </Button>
    );
};

export { GithubButton, GoogleButton, LinkedInButton };

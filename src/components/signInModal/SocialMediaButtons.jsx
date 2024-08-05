import React from 'react';
import Image from 'next/image';
import GoogleIcon from '@/assets/images/socialicon1.svg';
import GithubIcon from '@/assets/images/sociaicon3.svg';
import LinkedInIcon from '@/assets/images/socialIcon2.svg';

const Button = ({ icon, children, onClick, className }) => (
    <button
        onClick={onClick}
        className={`flex text-primary font-semibold items-center justify-left w-full py-3 px-4  border rounded-lg ${className}`}
    >
        <Image src={icon} alt="Icon" width={24} height={24} className="mr-4" />
        {children}
    </button>
);

const GoogleButton = () => (
    <Button className="bg-[#5186EC]" icon={GoogleIcon}>
        Sign in with Google
    </Button>
);

const LinkedInButton = () => (
    <Button className="bg-[#0A66C2]" icon={LinkedInIcon}>
        Sign in with LinkedIn
    </Button>
);

const GithubButton = () => (
    <Button className="bg-[#1B1817]" icon={GithubIcon}>
        Sign in with Github
    </Button>
);

export { GithubButton, GoogleButton, LinkedInButton };

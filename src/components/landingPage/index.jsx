'use client';
import React from 'react';
import Image from 'next/image';
import RobotsImg from '@/assets/images/Illustration.svg';
import Netflix from '@/assets/images/Netflix.svg';
import Slack from '@/assets/images/Slack.svg';
import Airbnb from '@/assets/images/Airbnb.svg';
import Google from '@/assets/images/Google.svg';
import Spotify from '@/assets/images/Spotify.svg';
import Twitch from '@/assets/images/Twitch.svg';

import Pinterest from '@/assets/images/Pinterest.svg';
import Snapchat from '@/assets/images/Snap.svg';
import LinkedIn from '@/assets/images/LinkedIn.svg';
import Discord from '@/assets/images/Discord.svg';
import Tiktok from '@/assets/images/TikTok.svg';
import Tesla from '@/assets/images/Tesla.svg';
import Shopify from '@/assets/images/Shopify.svg';
import Twitter from '@/assets/images/Twitter.svg';
import Microsoft from '@/assets/images/Microsoft.svg';
import Adobe from '@/assets/images/Adobe.svg';
import Telegram from '@/assets/images/Telegram.svg';
import Youtube from '@/assets/images/YouTube.svg';
import Paypal from '@/assets/images/PayPal.svg';
import Instagram from '@/assets/images/Instagram.svg';
import Airtable from '@/assets/images/Airtable.svg';
import Dropbox from '@/assets/images/Dropbox.svg';
import Duolingo from '@/assets/images/Duolingo.svg';
import Facebook from '@/assets/images/Facebook.svg';
import Figma from '@/assets/images/Figma.svg';
import Github from '@/assets/images/GitHub.svg';
import Square from '@/assets/images/Square.svg';
import Terminal from '@/assets/images/Terminal.svg';
import Hatch from '@/assets/images/Hatch.svg';
import Abstract from '@/assets/images/Abstract.svg';
import { useRouter } from 'next/navigation';

const companies = [
    { name: 'Netflix', image: Netflix },
    { name: 'Slack', image: Slack },
    { name: 'Airbnb', image: Airbnb },
    { name: 'Google', image: Google },
    { name: 'Spotify', image: Spotify },
    { name: 'Twitch', image: Twitch },
];

const otherCompanies = [
    { name: 'Pinterest', image: Pinterest },
    { name: 'Snapchat', image: Snapchat },
    { name: 'LinkedIn', image: LinkedIn },
    { name: 'Discord', image: Discord },
    { name: 'Tiktok', image: Tiktok },
    { name: 'Tesla', image: Tesla },
    { name: 'Shopify', image: Shopify },
    { name: 'Twitter', image: Twitter },
    { name: 'Microsoft', image: Microsoft },
    { name: 'Adobe', image: Adobe },
    { name: 'Telegram', image: Telegram },
    { name: 'Youtube', image: Youtube },
    { name: 'Paypal', image: Paypal },
    { name: 'Instagram', image: Instagram },
    { name: 'Airtable', image: Airtable },
    { name: 'Dropbox', image: Dropbox },
    { name: 'Duolingo', image: Duolingo },
    { name: 'Facebook', image: Facebook },
    { name: 'Figma', image: Figma },
    { name: 'Github', image: Github },
    { name: 'Square', image: Square },
    { name: 'Terminal', image: Terminal },
    { name: 'Hatch', image: Hatch },
    { name: 'Abstract', image: Abstract },
];

const companyStyles = {
    Netflix: 'hover:bg-companies-netflix-black',
    Google: 'hover:bg-companies-google-blue',
    Slack: 'hover:bg-companies-slack-purple',
    Airbnb: 'hover:bg-companies-airbnb-pink',
    Twitch: 'hover:bg-companies-twitch',
    Spotify: 'hover:bg-companies-spotify',
    // other companies start below
    Pinterest: 'hover:bg-othercompanies-pinterest',
    Snapchat: 'hover:bg-othercompanies-snapchat',
    LinkedIn: 'hover:bg-othercompanies-linkedin',
    Discord: 'hover:bg-othercompanies-discord',
    Tiktok: 'hover:bg-othercompanies-tiktok',
    Tesla: 'hover:bg-othercompanies-tesla',
    Shopify: 'hover:bg-othercompanies-shopify',
    Twitter: 'hover:bg-othercompanies-twitter',
    Microsoft: 'hover:bg-othercompanies-microsoft',
    Adobe: 'hover:bg-othercompanies-adobe',
    Telegram: 'hover:bg-othercompanies-telegram',
    Youtube: 'hover:bg-othercompanies-youtube',
    Paypal: 'hover:bg-othercompanies-paypal',
    Instagram: 'hover:bg-othercompanies-instagram',
    Airtable: 'hover:bg-othercompanies-airtable',
    Dropbox: 'hover:bg-othercompanies-dropbox',
    Duolingo: 'hover:bg-othercompanies-duolingo',
    Facebook: 'hover:bg-othercompanies-facebook',
    Figma: 'hover:bg-othercompanies-figma',
    Github: 'hover:bg-othercompanies-github',
    Square: 'hover:bg-othercompanies-square',
    Terminal: 'hover:bg-othercompanies-terminal',
    Hatch: 'hover:bg-othercompanies-hatch',
    Abstract: 'hover:bg-othercompanies-abstract',

};

const logoClassNames = {
    Hatch: 'logo-white-hover',
    Abstract: 'logo-white-hover',
    Github: 'logo-white-hover',
    Square: 'logo-white-hover',
    Discord: 'logo-white-hover',
    Terminal:'logo-white-hover',
    Youtube:'logo-white-hover',
    Tesla:'logo-white-hover',
    LinkedIn:'logo-white-hover',
    Snapchat:'logo-white-hover',
    Twitter:'logo-white-hover',
    Dropbox:'logo-white-hover'
};

const Landing = () => {
    const router = useRouter();

   const handleCompanyClick = (companyName) => {
    router.push(`/company/${companyName?.toLowerCase()}`);
};
    return (
        <div className="min-h-screen bg-secondary flex flex-col p-4 pt-12">
            <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12">
                <div className="flex flex-col items-center lg:items-start text-text-heading text-center lg:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                        Get a referral to your dream company or get paid
                        <br className="hidden lg:block" />
                        to help others get there
                    </h1>
                    <p className="text-base sm:text-lg mt-4 lg:text-lg lg:font-semibold">
                        Sign up as a plug or candidate to get started
                    </p>
                </div>
                <div className="flex justify-center lg:justify-end w-full lg:w-auto">
                    <Image
                        src={RobotsImg}
                        alt="Robots"
                        width={470}
                        height={220}
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="mx-4 mt-12">
                <h2 className="text-lg font-semibold mb-6 text-center lg:text-left">
                    Popular Companies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies?.map((company, index) => (
                        <div
                            key={index}
                            className={`relative bg-primary rounded-[10px] shadow-lg flex items-center p-4 cursor-pointer transition-colors duration-300 group h-[84px] ${companyStyles[company.name]}`}
                            onClick={() => handleCompanyClick(company?.name)}
                        >
                            <div className="flex-shrink-0">
                                <Image
                                    src={company?.image}
                                    alt={company?.name}
                                    width={24}
                                    height={24}
                                    className={`object-contain ${company.name === 'Airbnb' ? 'logo-white-hover' : ''}`}
                                />
                            </div>
                            <div className="ml-4 flex-grow flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-black group-hover:text-white transition-colors duration-300">
                                    {company?.name}
                                </h2>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white">Explore</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mx-4 mt-12 mb-4">
                <h2 className="text-lg font-semibold mb-6 text-center lg:text-left">
                    Other companies on palplug
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherCompanies?.map((company, index) => (
                        <div
                            key={index}
                            className={`relative bg-primary rounded-[10px] shadow-lg flex items-center p-4 cursor-pointer ${companyStyles[company?.name]}  transition-colors duration-300 group h-[84px]`}
                            onClick={() => handleCompanyClick(company?.name)}
                        >
                            <div className="flex-shrink-0">
                                <Image
                                    src={company?.image}
                                    alt={company?.name}
                                    width={24}
                                    height={24}
                                    className={`object-contain ${logoClassNames[company?.name] || ''}`}
                                />
                            </div>
                            <div className="ml-4 flex-grow flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-black group-hover:text-white transition-colors duration-300">
                                    {company.name}
                                </h2>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white">Explore</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Landing;

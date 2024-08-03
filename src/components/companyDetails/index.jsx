'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Netflix from '@/assets/images/Netflix.svg';
import Slack from '@/assets/images/Slack.svg';
import Airbnb from '@/assets/images/Airbnb.svg';
import Google from '@/assets/images/Google.svg';
import Spotify from '@/assets/images/Spotify.svg';
import Twitch from '@/assets/images/Twitch.svg';
import ArrowIcon from '@/assets/images/arrow.svg';
import { useState } from 'react';
import EmployeeCard from '../employeCard';
import MaleImg from '@/assets/images/male.svg';
import FemaleImg from '@/assets/images/female.svg';
import FemaleImg2 from '@/assets/images/femal2.png';
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

const companyImages = {
    Netflix,
    Slack,
    Airbnb,
    Google,
    Spotify,
    Twitch,
    Pinterest,
    Snapchat,
    LinkedIn,
    Discord,
    Tiktok,
    Tesla,
    Shopify,
    Twitter,
    Microsoft,
    Adobe,
    Telegram,
    Youtube,
    Paypal,
    Instagram,
    Airtable,
    Dropbox,
    Duolingo,
    Facebook,
    Figma,
    Github,
    Square,
    Terminal,
    Hatch,
    Abstract,
};

const companyStyles = {
    Netflix: 'bg-companies-netflix-black',
    Google: 'bg-companies-google-blue',
    Slack: 'bg-companies-slack-purple',
    Airbnb: 'bg-companies-airbnb-pink',
    Twitch: 'bg-companies-twitch',
    Spotify: 'bg-companies-spotify',
    // other companies start below
    Pinterest: 'bg-othercompanies-pinterest',
    Snapchat: 'bg-othercompanies-snapchat',
    LinkedIn: 'bg-othercompanies-linkedin',
    Discord: 'bg-othercompanies-discord',
    Tiktok: 'bg-othercompanies-tiktok',
    Tesla: 'bg-othercompanies-tesla',
    Shopify: 'bg-othercompanies-shopify',
    Twitter: 'bg-othercompanies-twitter',
    Microsoft: 'bg-othercompanies-microsoft',
    Adobe: 'bg-othercompanies-adobe',
    Telegram: 'bg-othercompanies-telegram',
    Youtube: 'bg-othercompanies-youtube',
    Paypal: 'bg-othercompanies-paypal',
    Instagram: 'bg-othercompanies-instagram',
    Airtable: 'bg-othercompanies-airtable',
    Dropbox: 'bg-othercompanies-dropbox',
    Duolingo: 'bg-othercompanies-duolingo',
    Facebook: 'bg-othercompanies-facebook',
    Figma: 'bg-othercompanies-figma',
    Github: 'bg-othercompanies-github',
    Square: 'bg-othercompanies-square',
    Terminal: 'bg-othercompanies-terminal',
    Hatch: 'bg-othercompanies-hatch',
    Abstract: 'bg-othercompanies-abstract',
};
const logoClassNames = {
    Airbnb: 'airbnb-white-img',
    Hatch: 'airbnb-white-img',
    Abstract: 'airbnb-white-img',
    Github: 'airbnb-white-img',
    Square: 'airbnb-white-img',
    Discord: 'airbnb-white-img',
    Terminal: 'airbnb-white-img',
    Youtube: 'airbnb-white-img',
    Tesla: 'airbnb-white-img',
    LinkedIn: 'airbnb-white-img',
    Snapchat: 'airbnb-white-img',
    Twitter: 'airbnb-white-img',
    Dropbox: 'airbnb-white-img',
};

const employees = [
    {
        id: 1,
        name: 'Idris Gettani',
        role: 'Partner Success @ Airbnb',
        city: 'San Francisco, CA',
        reviews: 4.9,
        hires: '12 successful hires',
        country: 'USA',
        yearsOfService: 5,
        referrals: 10,
        interviews: 20,
        image: MaleImg,
    },
    {
        id: 2,
        name: 'Maddy Grey',
        role: 'Software Engineer II @ Airbnb',
        city: 'San Francisco, CA',
        reviews: 4.75,
        hires: '8 successful hires',
        country: 'USA',
        yearsOfService: 3,
        referrals: 8,
        interviews: 15,
        image: FemaleImg,
    },
    {
        id: 3,
        name: 'Angela Wynn',
        role: 'Marketing @ Airbnb',
        city: 'San Francisco, CA',
        reviews: 4.78,
        hires: '8 successful hires',
        country: 'USA',
        yearsOfService: 3,
        referrals: 8,
        interviews: 15,
        image: FemaleImg2,
    },
];

const CompanyDetails = () => {
    const router = useRouter();
    const { name, id } = useParams();
    const displayName =
        name?.charAt(0)?.toUpperCase() + name.slice(1)?.toLowerCase();
    const image = companyImages[displayName];
    const bgColor = companyStyles[displayName] || 'bg-gray-800';

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    const handleEmployeeClick = (employeeId) => {
        router.push(
            `/company/${displayName}/employees/${employeeId}`,
            undefined,
            { shallow: true }
        );
    };

    return (
        <>
            <div
                className={`w-full h-[96px] ${bgColor} flex items-center justify-center`}
            >
                <div className="w-full max-w-[1440px] flex items-center justify-center">
                    <div className="flex items-center space-x-6">
                        <Image
                            src={image}
                            alt={displayName}
                            width={40}
                            height={40}
                            className={`object-contain ${logoClassNames[displayName] || ''}`}
                        />
                        <h1 className="text-primary text-[42px] font-semibold">
                            {displayName}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Custom Dropdowns Section */}
            <div className="w-full mt-4 px-4 flex flex-wrap gap-4">
                {/* Dropdown 1: Job Function */}
                <div className="relative inline-block text-left mb-4">
                    <button
                        id="dropdownJobFunctionButton"
                        onClick={() => toggleDropdown('dropdownJobFunction')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
                        type="button"
                    >
                        <span className="text-sm">Job Function</span>
                        <Image
                            src={ArrowIcon}
                            alt="Arrow Icon"
                            width={16}
                            height={16}
                            className={`w-4 h-4 ml-2 transition-transform duration-300 ${openDropdown === 'dropdownJobFunction' ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </button>
                    {/* Dropdown menu */}
                    <div
                        id="dropdownJobFunction"
                        className={`z-10 ${
                            openDropdown === 'dropdownJobFunction'
                                ? 'block'
                                : 'hidden'
                        } bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] absolute mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownJobFunctionButton"
                        >
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="job-function-checkbox-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="job-function-checkbox-1"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        Product Design
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="job-function-checkbox-2"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="job-function-checkbox-2"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        Software Development
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="job-function-checkbox-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="job-function-checkbox-3"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        Systems Engineering
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Dropdown 2: Price */}
                <div className="relative inline-block text-left mb-4">
                    <button
                        id="dropdownPriceButton"
                        onClick={() => toggleDropdown('dropdownPrice')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
                        type="button"
                    >
                        <span className="text-sm">Price</span>
                        <Image
                            src={ArrowIcon}
                            alt="Arrow Icon"
                            width={16}
                            height={16}
                            className={`w-4 h-4 ml-2 transition-transform duration-300 ${openDropdown === 'dropdownPrice' ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </button>
                    {/* Dropdown menu */}
                    <div
                        id="dropdownPrice"
                        className={`z-10 ${
                            openDropdown === 'dropdownPrice'
                                ? 'block'
                                : 'hidden'
                        } bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] absolute mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownPriceButton"
                        >
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="price-checkbox-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="price-checkbox-1"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        $0-$20
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="price-checkbox-2"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="price-checkbox-2"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        $0-$30
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="price-checkbox-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="price-checkbox-3"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        $0-$40
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Dropdown 3: Highest Rated */}
                <div className="relative inline-block text-left mb-4">
                    <button
                        id="dropdownHighestRatedButton"
                        onClick={() => toggleDropdown('dropdownHighestRated')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
                        type="button"
                    >
                        <span className="text-sm">Highest Rated</span>
                        <Image
                            src={ArrowIcon}
                            alt="Arrow Icon"
                            width={16}
                            height={16}
                            className={`w-4 h-4 ml-2 transition-transform duration-300 ${openDropdown === 'dropdownHighestRated' ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </button>
                    {/* Dropdown menu */}
                    <div
                        id="dropdownHighestRated"
                        className={`z-10 ${
                            openDropdown === 'dropdownHighestRated'
                                ? 'block'
                                : 'hidden'
                        } bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] absolute mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownHighestRatedButton"
                        >
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="highest-rated-checkbox-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="highest-rated-checkbox-1"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        4.0-5.0
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="highest-rated-checkbox-2"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="highest-rated-checkbox-2"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        4.5-5.0
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input
                                        id="highest-rated-checkbox-3"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label
                                        htmlFor="highest-rated-checkbox-3"
                                        className="ml-2 text-sm text-dropdowntext"
                                    >
                                        5.0
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full  py-8 flex flex-col items-center bg-employecard-bg-main-card min-h-screen">
                {employees?.map((employee, index) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onClick={() => handleEmployeeClick(employee?.id)}
                    />
                ))}
            </div>
        </>
    );
};

export default CompanyDetails;

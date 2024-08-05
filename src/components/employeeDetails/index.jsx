'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import EmployeeCard from '../employeCard';
import { useParams } from 'next/navigation';
import TimeImg from '@/assets/images/Group.svg';
import MovieImg from '@/assets/images/movies.svg';
import MaleImg from '@/assets/images/male.svg';
import Netflix from '@/assets/images/Netflix.svg';
import FemaleImg from '@/assets/images/female.svg';
import FemaleImg2 from '@/assets/images/femal2.png';
import SignInModal from '@/components/signInModal';

const companyStyles = {
    Netflix: 'bg-companies-netflix-black',
    Google: 'bg-companies-google-blue',
    Slack: 'bg-companies-slack-purple',
    Airbnb: 'bg-companies-airbnb-pink',
    Twitch: 'bg-companies-twitch',
    Spotify: 'bg-companies-spotify',
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

const EmployeeDetails = () => {
    const [activeTab, setActiveTab] = useState('Referral');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { name, employeeId } = useParams();
    const employees = [
        {
            id: '1',
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
            id: '2',
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
            id: '3',
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

    const employee = employees.find((emp) => emp.id === employeeId);
    const bgColor = companyStyles[name] || 'bg-gray-800';

    useEffect(() => {
        if (!employee) {
            router.push('/');
        }
    }, [employee]);
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Referral':
                return (
                    <div className="p-4">
                        <div className="flex justify-between mb-4 text-base text-text-heading">
                            <h5 className="text-lg font-semibold">
                                Standard Employee Referral
                            </h5>
                            <p className="text-lg ">$20.00</p>
                        </div>
                        <h6 className="text-base font-lightbold mb-2">
                            About this package
                        </h6>
                        <p className="text-sm text-grey30 mb-4">
                            Employee referral to Slack. Video call required to
                            determine if candidate is a good fit for the
                            position. Once accepted, you will receive a referral
                            confirmation (You are not guaranteed to receive an
                            offer from Slack).
                        </p>
                        <div className="flex items-center mb-4">
                            <Image
                                src={TimeImg}
                                alt="1 day delivery"
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <p className="text-sm">1 day delivery</p>
                        </div>
                        <div className="flex items-center mb-6">
                            <Image
                                src={MovieImg}
                                alt="Video screening required"
                                width={24}
                                height={24}
                                className="mr-2"
                            />
                            <p className="text-sm">Video screening required</p>
                        </div>
                        <button
                            className="w-full py-2 bg-[#005382] text-primary rounded-lg mt-4"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Select Package ($20.00)
                        </button>
                        <SignInModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />
                        <p className="text-sm text-center mt-4">Contact</p>
                    </div>
                );
            case 'Resume Review':
                return <div className="p-4">Resume Review Content</div>;
            case 'Interview Prep':
                return <div className="p-4">Interview Prep Content</div>;
            default:
                return null;
        }
    };

    return (
        <>
            <div
                className={`w-full h-[96px] ${bgColor} flex items-center justify-center`}
            >
                <div className="w-full flex items-center justify-center">
                    <div className="flex items-baseline space-x-6">
                        <Image
                            src={Netflix}
                            alt={name}
                            width={40}
                            height={40}
                            className={`object-contain ${logoClassNames[name] || ''}`}
                        />
                        <h1 className="text-primary text-[42px] font-semibold">
                            {name}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="bg-employecard-bg-main-card min-h-screen">
                <div className="flex flex-col lg:flex-row gap-4 p-8 justify-center">
                    <div className="flex-1 max-w-[1000px] space-y-4">
                        <EmployeeCard
                            employee={employee}
                            showAbout={true}
                            showReviews={true}
                        />
                        <div className="bg-white p-4 shadow-lg rounded-md">
                            <h2 className="text-lg font-semibold mb-2 text-text-heading">
                                How it works
                            </h2>
                            <p className="text-sm font-lightbold text-text-heading">
                                If you’re looking to land an amazing job of your
                                dreams at Slack, I’m the person that gives you
                                the best shot. I have been at Slack for 4 years
                                and have built a great reputation in the
                                partnership team and a referral from me will
                                carry huge weight. I’ve gotten 12 people hired
                                through palplug referrrals, resume reviews and
                                interview prep.
                            </p>
                            <p className="text-sm font-lightbold text-text-heading">
                                Even though I would love to get everyone hired,
                                I would need to see your skillset to evaluate if
                                you would be a good candidate for the job to
                                save everyone the time and effort.
                            </p>
                            <p className="text-sm font-semibold text-employecard-card-grey-text">
                                Referrals:
                            </p>
                            <p className="text-sm text-grey40">
                                Once you request a referral, I will reach out to
                                you to schedule a time to hop on a quick video
                                call to review your experience. Please have your
                                resume uploaded or sent to me at
                                idrisgettani@slack.com prior to our call.
                                <br />
                                <br />
                                This isn’t necessarily an interview but a chance
                                to assess if the referral is worth it for you
                                (Don’t want anyone spending $20 if there isn’t
                                really an opportunity to get hired).
                                <br />
                                <br />
                                Once everything looks good, I’ll accept the
                                request and get to work on your referral. After
                                I submit it, I will send you the referral
                                confirmation to finalize the transaction. At
                                that point, I will close the transaction and the
                                money will be transferred.
                                <br />
                                <br />
                                Best of luck!
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 lg:max-w-[436px] bg-primary p-4 h-[522px]">
                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 mb-4">
                            {[
                                'Referral',
                                'Resume Review',
                                'Interview Prep',
                            ]?.map((tab) => (
                                <li key={tab} className="me-2">
                                    <a
                                        href="#"
                                        className={`inline-block px-4 py-3 rounded-[4px] ${activeTab === tab ? 'bg-[#D2EFFF] text-employecard-card-blue-hover' : 'hover:text-employecard-card-blue-hover hover:bg-gray-100'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActiveTab(tab);
                                        }}
                                    >
                                        {tab}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex-1 overflow-auto">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDetails;

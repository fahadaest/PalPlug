'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    selectCompanies,
    selectOtherCompanies,
    selectCompanyStyles,
    selectWhiteRoundedImges,
} from '@/app/lib/features/companies/companiesSlice';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import RobotsImg from '@/assets/images/Illustration.svg';

const Landing = () => {
    const router = useRouter();
    const companies = useSelector(selectCompanies);
    const otherCompanies = useSelector(selectOtherCompanies);
    const companyStyles = useSelector(selectCompanyStyles);
    const whiteRoundedImges = useSelector(selectWhiteRoundedImges);
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
                    {companies?.map((company, index) => {
                        const bgClass = companyStyles[company.name];
                        return (
                            <div
                                key={index}
                                className={`relative bg-primary rounded-[10px] shadow-lg flex items-center p-4 cursor-pointer transition-colors duration-300 group h-[84px] ${bgClass}`}
                                onClick={() =>
                                    handleCompanyClick(company?.name)
                                }
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
                                        <span className="text-white">
                                            Explore
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mx-4 mt-12 mb-4">
                <h2 className="text-lg font-semibold mb-6 text-center lg:text-left">
                    Other companies on palplug
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherCompanies?.map((company, index) => {
                        const bgClass = companyStyles[company.name];
                        return (
                            <div
                                key={index}
                                className={`relative bg-primary rounded-[10px] shadow-lg flex items-center p-4 cursor-pointer transition-colors duration-300 group h-[84px] ${bgClass}`}
                                onClick={() =>
                                    handleCompanyClick(company?.name)
                                }
                            >
                                <div className="flex-shrink-0">
                                    <Image
                                        src={company?.image}
                                        alt={company?.name}
                                        width={24}
                                        height={24}
                                        className={`object-contain ${whiteRoundedImges[company?.name] || ''}`}
                                    />
                                </div>
                                <div className="ml-4 flex-grow flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-black group-hover:text-white transition-colors duration-300">
                                        {company.name}
                                    </h2>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white">
                                            Explore
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Landing;

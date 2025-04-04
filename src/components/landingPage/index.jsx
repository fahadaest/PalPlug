'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    selectOtherCompanies,
    selectCompanyStyles,
    selectWhiteRoundedImges,
} from '@/app/redux/slice/companies/companiesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import RobotsImg from '@/assets/images/Illustration.svg';
import SignInModal from '@/components/signInModal';
import { fetchCompanies } from '@/app/redux/action';

const Landing = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const companyStyles = useSelector(selectCompanyStyles);
    const whiteRoundedImges = useSelector(selectWhiteRoundedImges);
    const user = useSelector((state) => state.user.user);
    const companies = useSelector((state) => state.companies.companies);
    const otherCompanies = useSelector(selectOtherCompanies);

    const [isModalOpen, setModalOpen] = useState(false);

    const handleCompanyClick = (companyName) => {
        if (user) {
            router.push(`/company/${companyName?.toLowerCase()}`);
        } else {
            setModalOpen(true);
        }
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    const handlePlugDasboard = () => {
        router.push('/plugDashboard');
    };



    return (

        <>
            <div className="min-h-screen pb-20 bg-gradient-to-b from-[#EBFAFE] to-[#EBE0FA] flex flex-col pl-[16px] pr-[16px] pt-12">
                <div className="md:container mx-auto flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12">
                    <div className="flex flex-col gap-[16px] items-center lg:items-start text-text-heading text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl md:text-[30px] font-semibold leading-[39px]">
                            Get a referral to your dream company or get paid
                            to help others get there
                        </h1>
                        <p className="text-center text-base leading-[24px] sm:text-lg  lg:text-[18px] lg:font-normal">
                            Sign up as a plug or candidate to get started
                            <br className="hidden lg:block" />
                        </p>
                        <div className="flex gap-[16px]">
                            <button  onClick={handlePlugDasboard} className="h-[40px] min-w-[131px] bg-[#005382] text-[12px] font-[600] text-white rounded-[8px] px-[20px] py-[11px]">
                                Become a Plug
                            </button>
                            <button className="h-[40px] min-w-[192px] text-[12px] font-[600] text-[#005382] border border-[#005382] rounded-[8px] px-[20px] py-[11px]">
                                Set Up Candidate Profile
                            </button>
                        </div>

                    </div>
                    <div className="flex justify-center lg:justify-end w-full lg:w-auto">
                        <Image
                            src={RobotsImg}
                            alt="Robots"
                            width={470}
                            height={220}
                            className="object-contain" />
                    </div>
                </div>
                <div className="mt-12  flex justify-items-start">
                    <h2 className="text-[18px] font-semibold mb-[20px] text-center lg:text-left">
                        Popular Companies
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-[0px] gap-[20px]">
                    {companies?.map((company, index) => {
                        const bgClass = companyStyles[company.name];
                        return (
                            <div
                                key={index}
                                className={`relative bg-[#FFFFFF] shadow-lg rounded-[10px] flex items-center p-4 transition-colors duration-100 md h-[76px]  ${bgClass}`}
                                onClick={() => handleCompanyClick(company?.name)}
                            >
                                <div className="flex-shrink-0">
                                    {company?.image ? (
                                        <Image
                                            src={company?.image}
                                            alt={company?.name}
                                            width={24}
                                            height={24} />
                                    ) : (
                                        <div className="w-[24px] h-[24px] bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-white">N/A</span>
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4 w-[74px] h-[24px] flex-grow flex items-center justify-between">
                                    <h2 className="text-[24px] font-semibold text-black md-hover:text-white transition-colors duration-100">
                                        {company?.name}
                                    </h2>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 md-hover:opacity-100 transition-opacity duration-150">
                                        <span className="text-white">
                                            Explore
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-12 flex justify-items-start">
                    <h2 className="text-[18px] font-semibold mb-[20px] text-center lg:text-left">
                        Other companies on palplug
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-[0px] gap-[20px]">
                    {otherCompanies?.map((company, index) => {
                        const bgClass = companyStyles[company?.name];
                        return (
                            <div
                                key={index}
                                className={`relative  bg-[#FFFFFF] rounded-[10px] shadow-lg flex items-center p-4 cursor-pointer transition-colors duration-150 md h-[76px] ${bgClass}`}
                                onClick={() => handleCompanyClick(company?.name)}
                            >
                                <div className="flex-shrink-0">
                                    <Image
                                        src={company?.image}
                                        alt={company?.name}
                                        width={24}
                                        height={24}
                                        className={`object-contain ${whiteRoundedImges[company?.name] || ''}`} />
                                </div>
                                <div className="ml-4 w-[116px] h-[24px] flex-grow flex items-center justify-between">
                                    <h2 className="text-[24px] font-semibold text-black md-hover:text-white transition-colors duration-150">
                                        {company.name}
                                    </h2>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 md-hover:opacity-100 transition-opacity duration-150">
                                        <span className="text-white ">
                                            Explore
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <SignInModal isOpen={isModalOpen && !user} onClose={handleModalClose} />
            </div>

        </>
    );
};
export default Landing;
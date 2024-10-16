'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import EmployeeCard from '../employeCard';
import { useParams } from 'next/navigation';
import TimeImg from '@/assets/images/Group.svg';
import MovieImg from '@/assets/images/movies.svg';

import SignInModal from '@/components/signInModal';
import { selectEmployees } from '@/app/redux/slice/employee/employeeSlice';
import { useSelector } from 'react-redux';
import {
    selectCompanies,
    selectCompanyStyles,
    selectLogoClassNames,
    selectOtherCompanies,
} from '@/app/redux/slice/companies/companiesSlice';

const EmployeeDetails = () => {
    const [activeTab, setActiveTab] = useState('Referral');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { name, employeeId } = useParams();
    const companies = useSelector(selectCompanies);
    const otherCompanies = useSelector(selectOtherCompanies);
    const companyStyles = useSelector(selectCompanyStyles);
    const logoClassNames = useSelector(selectLogoClassNames);
    const employees = useSelector(selectEmployees);

    const employee = employees?.find(
        (emp) => emp?.id.toString() === employeeId
    );

    const displayName =
        name?.charAt(0)?.toUpperCase() + name.slice(1)?.toLowerCase();
    const company = [...companies, ...otherCompanies]?.find(
        (comp) => comp.name === displayName
    );
    const bgColor = companyStyles[company?.name]
        ? companyStyles[company?.name]?.replace('hover:', '')
        : 'bg-gray-800';

    const companyLogo = company?.image;
    const activeService = employee?.services?.find((service) => service?.title === activeTab);

    useEffect(() => {
        if (!employee) {
            router.push('/');
        }
    }, [employee]);

    const renderTabContent = () => {
        if (!activeService) return null;

                return (
                    <div className="p-4">
                        <div className="flex justify-between mb-4 text-base text-text-heading">
                            <h5 className="text-lg font-semibold">
                                Standard Employee Referral
                            </h5>
                            <p className="text-lg ">${activeService?.price?.toFixed(2)}</p>
                        </div>
                        <h6 className="text-base font-lightbold mb-2">
                            About this package
                        </h6>
                        <p className="text-sm text-grey30 mb-4">
                           {activeService?.package}
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
                            Select Package
                        </button>
                        <SignInModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />
                        <p className="text-sm text-center mt-4">Contact {employee?.name}</p>
                    </div>
                );
        }
    

    return (
        <>
            <div
                className={`w-full h-[48px] ${bgColor} flex items-center justify-center`}
            >
                <div className="w-full flex items-center justify-center">
                    <div className="flex items-center space-x-6">
                        <Image
                            src={companyLogo}
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
                                dreams at {displayName}, I’m the person that gives you
                                the best shot. I have been at {displayName} for 4 years
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

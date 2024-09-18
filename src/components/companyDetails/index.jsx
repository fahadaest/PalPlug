'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ArrowIcon from '@/assets/images/arrow.svg';
import { useState } from 'react';
import EmployeeCard from '../employeCard';

import {
    selectCompanyStyles,
    selectCompanies,
    selectOtherCompanies,
    selectLogoClassNames,
} from '@/app/redux/slice/companies/companiesSlice';
import { useSelector } from 'react-redux';
import { selectEmployees } from '@/app/redux/slice/employee/employeeSlice';

const CompanyDetails = () => {
    const router = useRouter();
    const { name } = useParams();
    const companies = useSelector(selectCompanies);
    const otherCompanies = useSelector(selectOtherCompanies);
    const companyStyles = useSelector(selectCompanyStyles);
    const employees = useSelector(selectEmployees);
    const logoClassNames = useSelector(selectLogoClassNames);
    const displayName =
        name?.charAt(0)?.toUpperCase() + name.slice(1)?.toLowerCase();
    const company = [...companies, ...otherCompanies]?.find(
        (comp) => comp.name === displayName
    );
    const companyLogo = company?.image;

    const bgColor = companyStyles[company?.name]
        ? companyStyles[company?.name]?.replace('hover:', '')
        : 'bg-gray-800';

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    const handleEmployeeClick = (employeeId) => {
        router.push(`/company/${name}/employees/${employeeId}`, undefined, {
            shallow: true,
        });
    };

    return (
        <>
            <div
                className={`w-full h-[96px] ${bgColor} flex items-center justify-center`}
            >
                <div className="w-full max-w-[1440px] flex items-center justify-center">
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

            <div className="w-full mt-4 px-4 flex gap-4 overflow-x-scroll">
              
                    <button
                        id="dropdownJobFunctionButton"
                        onClick={() => toggleDropdown('dropdownJobFunction')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none relative inline-block text-left mb-4  max-w-[276px] min-w-[275px]"
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
               

                    </button>
                    
                
                    <button
                        id="dropdownPriceButton"
                        onClick={() => toggleDropdown('dropdownPrice')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none relative inline-block text-left mb-4  max-w-[276px] min-w-[275px]"
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
              

               
                    <button
                        id="dropdownHighestRatedButton"
                        onClick={() => toggleDropdown('dropdownHighestRated')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none relative inline-block text-left mb-4  max-w-[276px] min-w-[275px]"
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

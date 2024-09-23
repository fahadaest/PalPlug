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

    

    const handleEmployeeClick = (employeeId) => {
        router.push(`/company/${name}/employees/${employeeId}`, undefined, {
            shallow: true,
        });
    };


    const [selectedJobFunction, setSelectedJobFunction] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedHighestRated, setSelectedHighestRated] = useState('');


    const toggleDropdown = (dropdownName) => {
        if (openDropdown === dropdownName) {
            setOpenDropdown(null); 
        } else {
            setOpenDropdown(dropdownName); 
        }
    };

    const toggleSelection = (dropdownName, value) => {
        if (dropdownName === 'dropdownJobFunction') {
            setSelectedJobFunction(value);
            setOpenDropdown(null); 
        } else if (dropdownName === 'dropdownPrice') {
            setSelectedPrice(value);
            setOpenDropdown(null); 
        } else if (dropdownName === 'dropdownHighestRated') {
            setSelectedHighestRated(value);
            setOpenDropdown(null); 
        }
    };

    const isSelected = (dropdownName, value) => {
        if (dropdownName === 'dropdownJobFunction') {
            return selectedJobFunction === value;
        } else if (dropdownName === 'dropdownPrice') {
            return selectedPrice === value;
        } else if (dropdownName === 'dropdownHighestRated') {
            return selectedHighestRated === value;
        }
        return false;
    };


    return (
        <>
            <div
                className={`w-full h-[48px] ${bgColor} flex items-center justify-center`}
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

            <div className="position-relative w-full mt-4 px-4 flex gap-4 overflow-x-scroll overscroll-y-contain">
            {/* Job Function Dropdown */}
            <div className="position-relative text-left mb-4 overscroll-none">
                <button
                    id="dropdownJobFunctionButton"
                    onClick={() => toggleDropdown('dropdownJobFunction')}
                    className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
                    type="button"
                >
                    <span className="text-sm">
                        {selectedJobFunction || 'Job Function'}
                    </span>
                    <Image
                        src={ArrowIcon}
                        alt="Arrow Icon"
                        width={16}
                        height={16}
                        className={`w-4 h-4 ml-2 transition-transform duration-300 ${openDropdown === 'dropdownJobFunction' ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>
                <div
                    id="dropdownJobFunction"
                    className={`z-10 ${openDropdown === 'dropdownJobFunction' ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] position-relative mt-1`}
                >
                    <ul className="p-3 space-y-1 text-sm text-dropdowntext">
                        {['Product Design', 'Software Development', 'Systems Engineering'].map((option, index) => (
                            <li key={index}>
                                <div className="  group hover:bg-[#005382] flex items-center p-2 rounded " onClick={() => toggleSelection('dropdownJobFunction', option)}>
                                    <input
                                        id={`job-function-checkbox-${index}`}
                                        type="checkbox"
                                        checked={isSelected('dropdownJobFunction', option)}
                                        readOnly
                                        className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded  accent-[#005382]"
                                    />
                                    <label htmlFor={`job-function-checkbox-${index}`} className="ml-2 text-sm text-dropdowntext  group-hover:text-white">
                                        {option}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Price Dropdown */}
            <div className="position-relative text-left mb-4 overscroll-none">
                <button
                    id="dropdownPriceButton"
                    onClick={() => toggleDropdown('dropdownPrice')}
                    className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
                    type="button"
                >
                    <span className="text-sm">
                        {selectedPrice || 'Price'}
                    </span>
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
                    className={`z-10 ${openDropdown === 'dropdownPrice' ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] position-relative mt-1`}
                >
                    <ul className="p-3 space-y-1 text-sm text-dropdowntext">
                        {['$0-$20', '$0-$30', '$0-$40'].map((option, index) => (
                            <li key={index}>
                                <div className=" group hover:bg-[#005382] flex items-center p-2 rounded " onClick={() => toggleSelection('dropdownPrice', option)}>
                                    <input
                                        id={`price-checkbox-${index}`}
                                        type="checkbox"
                                        checked={isSelected('dropdownPrice', option)}
                                        readOnly
                                        className="w-3 h-3 t bg-gray-100 border-gray-300 rounded accent-[#005382]"
                                    />
                                    <label htmlFor={`price-checkbox-${index}`} className="ml-2 text-sm text-dropdowntext group-hover:text-white">
                                        {option}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Highest Rated Dropdown */}
            <div className="position-relative text-left mb-4 overscroll-none">
                <button
                    id="dropdownHighestRatedButton"
                    onClick={() => toggleDropdown('dropdownHighestRated')}
                    className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
                    type="button"
                >
                    <span className="text-sm">
                        {selectedHighestRated || 'Highest Rated'}
                    </span>
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
                    className={`z-10 ${openDropdown === 'dropdownHighestRated' ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] position-relative mt-1`}
                >
                    <ul className="p-3 space-y-1 text-sm text-dropdowntext">
                        {['4.0-5.0', '3.0-4.0', '2.0-3.0'].map((option, index) => (
                            <li key={index}>
                                <div className="group hover:bg-[#005382] flex items-center p-2 rounded h" onClick={() => toggleSelection('dropdownHighestRated', option)}>
                                    <input
                                        id={`highest-rated-checkbox-${index}`}
                                        type="checkbox"
                                        checked={isSelected('dropdownHighestRated', option)}
                                        readOnly
                                        className="w-3 h-3  bg-gray-100 border-gray-300 rounded accent-[#005382] "
                                    />
                                    <label htmlFor={`highest-rated-checkbox-${index}`} className="ml-2 text-sm text-dropdowntext group-hover:text-white">
                                        {option}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        
        
        
        
        
        
            <div className="w-full  md:py-8  flex flex-col items-center xs:bg-white xs:pl-[16px] xs:pr-[16px]  sm:bg-white sm:pl-[16px] sm:pr-[16px] md:bg-[#F5F5F5]  min-h-screen">
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

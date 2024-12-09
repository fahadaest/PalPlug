'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ArrowIcon from '@/assets/images/arrow.svg';
import { useEffect, useState } from 'react';
import EmployeeCard from '../employeCard';
import {
    selectCompanyStyles,
    selectLogoClassNames,
    selectJobFunctions,
    selectPriceRanges,
    selectRatings,
} from '@/app/redux/slice/companies/companiesSlice';
import { useSelector } from 'react-redux';
import { selectEmployees } from '@/app/redux/slice/employee/employeeSlice';
import Close from '@/assets/images/Close.svg';
import Drawar from '@/assets/images/Drawer.svg';

const CompanyDetails = () => {
    const router = useRouter();
    const { name } = useParams();
    const companyStyles = useSelector(selectCompanyStyles);
    const employees = useSelector(selectEmployees);
    const logoClassNames = useSelector(selectLogoClassNames);
    const [selectedJobFunction, setSelectedJobFunction] =
        useState('Job Function');
    const [selectedPrice, setSelectedPrice] = useState('Price');
    const [selectedHighestRated, setSelectedHighestRated] =
        useState('Highest Rated');
    const companies = useSelector((state) => state.companies.companies);

    const displayName =
        name?.charAt(0)?.toUpperCase() + name.slice(1)?.toLowerCase();
    const company = companies?.find(
        (comp) => comp?.name === displayName
    );

    const bgColor = companyStyles[company?.name]
        ? companyStyles[company?.name]?.replace('hover:', '')
        : 'bg-gray-800';

    const [openDropdown, setOpenDropdown] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [checkedOption, setCheckedOption] = useState(null);
    const toggleModal = (modalId) => {
        setOpenModal(openModal === modalId ? null : modalId);
    };
    const jobFunctions = useSelector(selectJobFunctions);
    const priceRanges = useSelector(selectPriceRanges);
    const ratings = useSelector(selectRatings);

    const toggleDropdown = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    const handleEmployeeClick = (employeeId) => {
        router.push(`/company/${name}/employees/${employeeId}`, undefined, {
            shallow: true,
        });
    };
    const checkIsMobile = () => window.innerWidth <= 768;
    useEffect(() => {
        const handleResize = () => setIsMobile(checkIsMobile());

        setIsMobile(checkIsMobile());

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handlebuttonClick = (id) => {
        if (isMobile) {
            toggleModal(id);
        } else {
            toggleDropdown(id);
        }
    };
    const handleSelection = (dropdownType, value) => {
        console.log(`Selected value for ${dropdownType}:`, value);

        switch (dropdownType) {
            case 'jobFunction':
                setSelectedJobFunction(value);
                break;
            case 'price':
                setSelectedPrice(value);
                break;
            case 'highestRated':
                setSelectedHighestRated(value);
                break;
            default:
                console.warn('Unknown dropdown type:', dropdownType);
        }

        setOpenModal(null);
        setOpenDropdown(null);
    };
    return (
        <>
            <div
                className={`w-full  ${bgColor} flex items-center justify-center`}>
                <div style={{ boxShadow: '0px 4px 15px 0px #01010117' }} className="w-full h-[48px] md:h-[96px] max-w-[1440px] flex items-center justify-center">
                    <div className="flex items-center gap-[15px]">
                        {company?.image ? (
                            <Image
                                src={company?.image}
                                alt={company?.name}
                                className='h-[21px] w-[21px] md:h-[42px] md:w-[42px]'
                            />
                        ) : (
                            <div className="w-[24px] h-[24px] bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-white">N/A</span>
                            </div>
                        )}
                        <h1 className="text-primary text-[21px] md:text-[42px] font-[600]">
                            {displayName}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="position-relative mt-2 mb-[2px] w-full px-4 flex gap-[16px] overflow-x-scroll overflow-y-visible">
                <div className="position-relative text-left overscroll-none">
                    <button
                        id="dropdownJobFunctionbutton"
                        onClick={() => handlebuttonClick('dropdownJobFunction')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-[8px] text-sm px-4 py-2.5 flex items-center justify-between w-[166px] md:w-[276px] h-[48px] focus:outline-none"
                        type="button"
                    >
                        <span className="text-sm">{selectedJobFunction}</span>
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
                        className={`absolute z-10 ${openDropdown === 'dropdownJobFunction'
                            ? 'block'
                            : 'hidden'
                            } bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] position-relative mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownJobFunctionbutton"
                        >
                            {jobFunctions?.map((jobFunction, index) => (
                                <li key={index}>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                        <input
                                            id={`job-function-checkbox-${index + 1}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            onChange={() =>
                                                handleSelection(
                                                    'jobFunction',
                                                    jobFunction
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={`job-function-checkbox-${index + 1}`}
                                            className="ml-2 text-sm text-dropdowntext"
                                        >
                                            {jobFunction}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="position-relative text-left  overscroll-none">
                    <button
                        id="dropdownPricebutton"
                        onClick={() => handlebuttonClick('dropdownPrice')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-[8px] text-sm px-4 py-2.5 flex items-center justify-between w-[105px] md:w-[218px] h-[48px] focus:outline-none"
                        type="button"
                    >
                        <span className="text-sm">{selectedPrice}</span>
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
                        className={`absolute z-10 ${openDropdown === 'dropdownPrice'
                            ? 'block'
                            : 'hidden'
                            } bg-white divide-y divide-gray-100 rounded-lg shadow w-[218px] position-relative mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownPricebutton"
                        >
                            {priceRanges?.map((priceRange, index) => (
                                <li key={index}>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                        <input
                                            id={`price-checkbox-${index}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            onChange={() =>
                                                handleSelection(
                                                    'price',
                                                    priceRange
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={`price-checkbox-${index}`}
                                            className="ml-2 text-sm text-dropdowntext"
                                        >
                                            {priceRange}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="position-relative text-left  overscroll-none">
                    <button
                        id="dropdownHighestRatedbutton"
                        onClick={() =>
                            handlebuttonClick('dropdownHighestRated')
                        }
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[218px] md:w-[218px] h-[48px] focus:outline-none"
                        type="button"
                    >
                        <span className="text-sm">{selectedHighestRated}</span>
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
                        className={`absolute z-10 ${openDropdown === 'dropdownHighestRated'
                            ? 'block'
                            : 'hidden'
                            } bg-white divide-y divide-gray-100 rounded-lg shadow w-[218px] position-relative mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownHighestRatedbutton"
                        >
                            {ratings?.map((rating, index) => (
                                <li key={index}>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                        <input
                                            id={`highest-rated-checkbox-${index}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            onChange={() =>
                                                handleSelection(
                                                    'highestRated',
                                                    rating
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={`highest-rated-checkbox-${index}`}
                                            className="ml-2 text-sm text-dropdowntext"
                                        >
                                            {rating}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {openModal && isMobile && (
                <div className="fixed inset-0 bg-[#F2F2F7B2] bg-opacity-50 flex justify-center items-end z-50">
                    <div className={`bg-white w-full max-w-md rounded-l-[8px] rounded-r-[8px] p-4 ${openModal ? 'modal-animation' : ''}`}>
                        <div className="flex justify-center items-center">
                            <Image
                                src={Drawar}
                                alt={Drawar}
                                width={36}
                                height={4}
                            />
                        </div>

                        {openModal === 'dropdownJobFunction' && (
                            <>
                                <div className="flex justify-between items-center h-[48px] ">
                                    <h2 className="text-[18px] font-[600]  text-[#373A36]">
                                        Job Function
                                    </h2>
                                    <button
                                        className="h-[24px] w-[24px] "
                                        onClick={() => setOpenModal(null)}
                                    >
                                        <Image
                                            src={Close}
                                            alt={Close}
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </div>
                                <ul>
                                    {jobFunctions?.map((jobFunction, index) => (
                                        <li key={index}>
                                            <button
                                                className="h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] font-[500]"
                                                onClick={() =>
                                                    handleSelection('jobFunction', jobFunction)
                                                }
                                            >
                                                {jobFunction}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {openModal === 'dropdownPrice' && (
                            <>
                                <div className="flex justify-between items-center h-[48px] ">
                                    <div></div>

                                    <h2 className="text-[18px] font-[600] text-[#373A36]">
                                        Price
                                    </h2>
                                    <button
                                        className="h-[24px] w-[24px]"
                                        onClick={() => setOpenModal(null)}
                                    >
                                        <Image
                                            src={Close}
                                            alt={Close}
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </div>
                                <ul>
                                    {priceRanges?.map((priceRange, index) => (
                                        <li key={index}>
                                            <button
                                                className="h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] font-[500]"
                                                onClick={() =>
                                                    handleSelection('price', priceRange)
                                                }
                                            >
                                                {priceRange}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {openModal === 'dropdownHighestRated' && (
                            <>
                                <div className="flex justify-between items-center h-[48px] ">
                                    <div></div>

                                    <h2 className="text-[18px] font-[600] text-[#373A36]">
                                        Highest Rated
                                    </h2>
                                    <button
                                        className="h-[24px] w-[24px]"
                                        onClick={() => setOpenModal(null)}
                                    >
                                        <Image
                                            src={Close}
                                            alt={Close}
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </div>
                                <ul>
                                    {ratings?.map((rating, index) => (
                                        <li key={index}>
                                            <button
                                                className="h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] font-[500]"
                                                onClick={() =>
                                                    handleSelection('highestRated', rating)
                                                }
                                            >
                                                {rating}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            )}


            <div className="w-full  md:py-8  flex flex-col items-center pl-[16px] pr-[16px] pt-[24px] bg-[#F5F5F5]  min-h-screen">
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
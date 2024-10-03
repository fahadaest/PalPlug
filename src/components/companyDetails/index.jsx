'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ArrowIcon from '@/assets/images/arrow.svg';
import { useEffect, useState } from 'react';
import EmployeeCard from '../employeCard';
import {
    selectCompanyStyles,
    selectCompanies,
    selectOtherCompanies,
    selectLogoClassNames,
} from '@/app/redux/slice/companies/companiesSlice';
import { useSelector } from 'react-redux';
import { selectEmployees } from '@/app/redux/slice/employee/employeeSlice';
import Close from "@/assets/images/Close.svg"
import Drawar from "@/assets/images/Drawer.svg"

const CompanyDetails = () => {
    const router = useRouter();
    const { name } = useParams();
    const companies = useSelector(selectCompanies);
    const otherCompanies = useSelector(selectOtherCompanies);
    const companyStyles = useSelector(selectCompanyStyles);
    const employees = useSelector(selectEmployees);
    const logoClassNames = useSelector(selectLogoClassNames);
    const [selectedJobFunction, setSelectedJobFunction] = useState('Job Function');
    const [selectedPrice, setSelectedPrice] = useState("Price");
    const [selectedHighestRated, setSelectedHighestRated] = useState("Highest Rated");

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
    const [openModal, setOpenModal] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [checkedOption, setCheckedOption] = useState(null);
    const toggleModal = (modalId) => {
        setOpenModal(openModal === modalId ? null : modalId);
    };

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
    const handlebuttonClick = (id)=> {
        if (isMobile) {
            toggleModal(id)


;
        } else {
            toggleDropdown(id)


;
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

            <div className="position-relative w-full mt-4 px-4 flex gap-4 overflow-x-scroll">
                <div className="position-relative text-left mb-4 overscroll-none">
                    <button
                        id="dropdownJobFunctionbutton"
                        onClick={() => handlebuttonClick('dropdownJobFunction')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
                        type="button"
                    >
                        <span className="text-sm">{selectedJobFunction}</span>
                        <Image
                            src={ArrowIcon}
                            alt="Arrow Icon"
                            width={16}
                            height={16}
                            className={`w-4 h-4 ml-2 `}
                        />
                    </button>
                    <div
                        id="dropdownJobFunction"
                        className={`z-10 ${
                            openDropdown === 'dropdownJobFunction'
                                ? 'block'
                                : 'hidden'
                        } bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] position-relative mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownJobFunctionbutton"
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
                                        onChange={() => handleSelection('jobFunction', 'Product Design')}
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
                                        onChange={() => handleSelection('jobFunction', 'Software Development')}
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
                                        onChange={() => handleSelection('jobFunction', 'Systems Engineering')}
                                    >
                                        Systems Engineering
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="position-relative text-left mb-4 overscroll-none">
                    <button
                        id="dropdownPricebutton"
                        onClick={() => handlebuttonClick('dropdownPrice')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
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
                        className={`z-10 ${
                            openDropdown === 'dropdownPrice'
                                ? 'block'
                                : 'hidden'
                        } bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] position-relative mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownPricebutton"
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
                                        onChange={() => handleSelection('price', '$0-$20')}
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
                                        onChange={() => handleSelection('price', '$0-$30')}
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
                                        onChange={() => handleSelection('price', '$0-$40')}
                                    >
                                        $0-$40
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="position-relative text-left mb-4 overscroll-none">
                    <button
                        id="dropdownHighestRatedbutton"
                        onClick={() => handlebuttonClick('dropdownHighestRated')}
                        className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[276px] h-[48px] focus:outline-none"
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
                        className={`z-10 ${
                            openDropdown === 'dropdownHighestRated'
                                ? 'block'
                                : 'hidden'
                        } bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] position-relative mt-1`}
                    >
                        <ul
                            className="p-3 space-y-1 text-sm text-dropdowntext"
                            aria-labelledby="dropdownHighestRatedbutton"
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
                                        onChange={() => handleSelection('highestRated', '4.0-5.0')}
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
                                        onChange={() => handleSelection('highestRated', '4.5-5.0')}
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
                                        onChange={() => handleSelection('highestRated', '5.0')}
                                    >
                                        5.0
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {openModal && isMobile && (
                <div className="fixed inset-0 bg-[#F2F2F7B2] bg-opacity-50 flex justify-center items-end z-50">
                    <div className="bg-white w-full  max-w-md rounded-l-[8px] rounded-r-[8px]  p-4">
                        <div className='flex justify-center items-center'>
                        <Image
                            src={Drawar}
                            alt={Drawar}
                            width={36}
                            height={4}
                           
                        />
                        </div>
                        
                         
                        {openModal === 'dropdownJobFunction' && (
                            <>
                            <div className='flex justify-between items-center h-[48px] '>
                                <div></div>
                                <h2 className="text-[18px] font-[600]  text-[#373A36]">
                                    Job Function
                                </h2>
                                <button className='h-[24px] w-[24px] '
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
                                <li> <button className='h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] fotn-[500]' onClick={() => handleSelection('jobFunction', 'Product Design')}>Product Design</button></li> 
                                <li> <button className='h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] fotn-[500]' onClick={() => handleSelection('jobFunction', 'Software Development')}>Software Development</button></li> 
                                <li> <button className='h-[48px] w-[auto] text-[#373A36] flex justify-around items-center text-[16px] fotn-[500]' onClick={() => handleSelection('jobFunction', 'Systems Engineering')}>Systems Engineering</button></li> 
                                </ul>
                                </>
                        )}
                        {openModal === 'dropdownPrice' && (
                           <>
                           <div className='flex justify-between items-center h-[48px] '>

                             <div></div>

                           <h2 className="text-[18px] font-[600]  text-[#373A36]">
                               Price
                           </h2>          
                             <button className='h-[24px] w-[24px] '
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
                            <li> <button className='h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] fotn-[500]' onClick={() => handleSelection('price', '$0-$20')}>$0-20$</button></li> 
                            <li> <button className='h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] fotn-[500]' onClick={() => handleSelection('price', '$0-$30')}>$0-30$</button></li> 
                            <li> <button className='h-[48px] w-[auto] text-[#373A36] flex justify-around items-center text-[16px] fotn-[500]' onClick={() => handleSelection('price', '$0-$40')}>$0-40$</button></li> 
                               </ul>
                            </>

                        )}
                        {openModal === 'dropdownHighestRated' && (
                                                       <>
                           <div className='flex justify-between items-center h-[48px] '>

                             <div></div>

                           <h2 className="text-[18px] font-[600]  text-[#373A36]">
                               Price
                           </h2>          
                             <button className='h-[24px] w-[24px] '
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
                           <li> <button className='h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] fotn-[500]' onClick={() => handleSelection('highestRated', '4.0-5.0')}>4.0-5.0 </button></li> 
                           <li> <button className='h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] fotn-[500]' onClick={() => handleSelection('highestRated', '4.5-5.0')}>4.5-5.0</button></li>
                           <li><button className='h-[48px] w-[auto] text-[#373A36] flex justify-around items-center text-[16px] fotn-[500]' onClick={() => handleSelection('highestRated', '5.0')}>5.0</button></li>
                           
                            </ul>
                            </>
                        )}
                    </div>
                </div>
            )}
            
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
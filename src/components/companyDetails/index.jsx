'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import EmployeeCard from '../employeCard';
import {
  selectCompanyStyles,
  selectLogoClassNames,
  selectPriceRanges,
  selectOtherCompanies,
  selectCompanies
} from '@/app/redux/slice/companies/companiesSlice';
import { useSelector } from 'react-redux';
import { selectEmployees } from '@/app/redux/slice/employee/employeeSlice';
import Close from '@/assets/images/Close.svg';
import Drawar from '@/assets/images/Drawer.svg';
import ArrowIcon from '@/assets/images/arrow.svg';

const CompanyDetails = () => {
  const router = useRouter();
  const { name } = useParams();

  const companyStyles = useSelector(selectCompanyStyles);
  const employees = useSelector(selectEmployees);
  const logoClassNames = useSelector(selectLogoClassNames);
  const companies = [
        ...useSelector(selectCompanies),
        ...useSelector(selectOtherCompanies)
      ];
  const [selectedJobFunction, setSelectedJobFunction] = useState('');
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedHighestRated, setSelectedHighestRated] = useState('Highest Rated');
  const [jobFunctionError, setJobFunctionError] = useState('');

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const jobFunctionOptions = ['Referral', 'Resume Review', 'Interview Prep'];
  const priceRanges = useSelector(selectPriceRanges); 
  const displayName =
    name?.charAt(0)?.toUpperCase() + name.slice(1)?.toLowerCase();
  const company = companies?.find((comp) => comp?.name === displayName);
  const bgColor = companyStyles[company?.name]
    ? companyStyles[company?.name]?.replace(/(.*?:)?hover:/, '')
    : 'bg-gray-800';

  const toggleModal = (modalId) => {
    setOpenModal(openModal === modalId ? null : modalId);
  };
  const toggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const checkIsMobile = () => window.innerWidth <= 768;
  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile());
    setIsMobile(checkIsMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlebuttonClick = (id) => {
    if (id === 'dropdownPrice' && (selectedJobFunction === '' || selectedJobFunction === 'Job Function')) {
      setJobFunctionError('Please select the Job Function');
      return;
    } else {
      setJobFunctionError('');
    }

    if (isMobile) {
      toggleModal(id);
    } else {
      toggleDropdown(id);
    }
  };
  const handleJobFunctionSelection = (value) => {
    if (selectedJobFunction === value) {
      setSelectedJobFunction('');
    } else {
      setSelectedJobFunction(value);
    }
   
    setJobFunctionError('');
    setOpenModal(null);
    setOpenDropdown(null);
  };

  const togglePriceSelection = (value) => {
    setSelectedPrices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setOpenModal(null);
    setOpenDropdown(null);
  };

  const handleHighestRatedSelection = (value) => {
    setSelectedHighestRated(value);
    setOpenModal(null);
    setOpenDropdown(null);
  };

  const handleEmployeeClick = (employeeId) => {
    router.push(`/company/${name}/employees/${employeeId}`, undefined, {
      shallow: true,
    });
  };

  const handleServiceSelect = (employeeId, serviceTitle) => {
    router.push(
      `/company/${name}/employees/${employeeId}?service=${encodeURIComponent(
        serviceTitle
      )}`
    );
  };
  const filteredEmployees = employees.filter((employee) => {
    if (selectedJobFunction === '' && selectedPrices.length === 0) {
      return true;
    }

    let passes = false;
    if (selectedJobFunction !== '') {
      const service = employee.services?.find(
        (s) =>
          s.title.toLowerCase() === selectedJobFunction.toLowerCase()
      );
      if (service) {
        if (selectedPrices.length === 0) {
          passes = true;
        } else {
          selectedPrices.forEach((priceRange) => {
            if (
              priceRange === '$0-$20' &&
              service.price >= 0 &&
              service.price <= 20
            ) {
              passes = true;
            } else if (
              priceRange === '$21-$40' &&
              service.price >= 21 &&
              service.price <= 40
            ) {
              passes = true;
            } else if (priceRange === '$40+' && service.price > 40) {
              passes = true;
            }
          });
        }
      }
    }
    return passes;
  });

  return (
    <>
      <div className={`w-full ${bgColor} flex items-center justify-center`}>
        <div
          style={{ boxShadow: '0px 4px 15px 0px #01010117' }}
          className="w-full h-[48px] md:h-[96px] max-w-[1440px] flex items-center justify-center"
        >
          <div className="flex items-center gap-[15px]">
            {company?.image ? (
              <Image
                src={company?.image}
                alt={company?.name}
                className="h-[21px] w-[21px] md:h-[42px] md:w-[42px]"
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
      <div className="position-relative pb-[16px] pt-[16px] w-full px-4 flex gap-[16px] overflow-x-scroll overflow-y-visible">
        <div className="position-relative text-left overscroll-none">
          <button
            id="dropdownJobFunctionbutton"
            onClick={() => handlebuttonClick('dropdownJobFunction')}
            className="text-dropdowntext bg-white border border-gray-300 rounded-[8px] text-sm px-4 py-2.5 flex items-center justify-between w-[166px] md:w-[276px] h-[48px] focus:outline-none"
            type="button"
          >
            <span className="text-sm">
              {selectedJobFunction !== ''
                ? selectedJobFunction
                : 'Job Function'}
            </span>
            <Image
              src={ArrowIcon}
              alt="Arrow Icon"
              width={16}
              height={16}
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                openDropdown === 'dropdownJobFunction' ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          <div
            id="dropdownJobFunction"
            className={`absolute z-10 ${
              openDropdown === 'dropdownJobFunction' ? 'block' : 'hidden'
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-[276px] position-relative mt-1`}
          >
            <ul
              className="p-3 space-y-1 text-sm text-dropdowntext"
              aria-labelledby="dropdownJobFunctionbutton"
            >
              {jobFunctionOptions.map((option, index) => (
                <li key={index}>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100">
                    <input
                      id={`job-function-checkbox-${index + 1}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      checked={selectedJobFunction === option}
                      onChange={() => handleJobFunctionSelection(option)}
                    />
                    <label
                      htmlFor={`job-function-checkbox-${index + 1}`}
                      className="ml-2 text-sm text-dropdowntext"
                    >
                      {option}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="position-relative text-left overscroll-none">
          <button
            id="dropdownPricebutton"
            onClick={() => handlebuttonClick('dropdownPrice')}
            className="text-dropdowntext bg-white border border-gray-300 rounded-[8px] text-sm px-4 py-2.5 flex items-center justify-between w-[105px] md:w-[218px] h-[48px] focus:outline-none"
            type="button"
          >
            <span className="text-sm">
              {selectedPrices.length > 0 ? selectedPrices.join(', ') : 'Price'}
            </span>
            <Image
              src={ArrowIcon}
              alt="Arrow Icon"
              width={16}
              height={16}
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                openDropdown === 'dropdownPrice' ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          {jobFunctionError && (
            <div className="text-red-500 text-sm mt-1">
              {jobFunctionError}
            </div>
          )}
          <div
            id="dropdownPrice"
            className={`absolute z-10 ${
              openDropdown === 'dropdownPrice' ? 'block' : 'hidden'
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
                      checked={selectedPrices.includes(priceRange)}
                      onChange={() => togglePriceSelection(priceRange)}
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
        <div className="position-relative text-left overscroll-none">
          <button
            id="dropdownHighestRatedbutton"
            onClick={() => handlebuttonClick('dropdownHighestRated')}
            className="text-dropdowntext bg-white border border-gray-300 rounded-lg text-sm px-4 py-2.5 flex items-center justify-between w-[218px] md:w-[218px] h-[48px] focus:outline-none"
            type="button"
          >
            <span className="text-sm">{selectedHighestRated}</span>
            <Image
              src={ArrowIcon}
              alt="Arrow Icon"
              width={16}
              height={16}
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                openDropdown === 'dropdownHighestRated' ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          <div
            id="dropdownHighestRated"
            className={`absolute z-10 ${
              openDropdown === 'dropdownHighestRated' ? 'block' : 'hidden'
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-[218px] position-relative mt-1`}
          >
            <ul
              className="p-3 space-y-1 text-sm text-dropdowntext"
              aria-labelledby="dropdownHighestRatedbutton"
            >
              {['Highest rated', 'Most hires', 'Most recent'].map(
                (ratingOption, index) => (
                  <li key={index}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                      <input
                        id={`highest-rated-checkbox-${index}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        checked={selectedHighestRated === ratingOption}
                        onChange={() => handleHighestRatedSelection(ratingOption)}
                      />
                      <label
                        htmlFor={`highest-rated-checkbox-${index}`}
                        className="ml-2 text-sm text-dropdowntext"
                      >
                        {ratingOption}
                      </label>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      {openModal && isMobile && (
        <div className="fixed inset-0 bg-[#F2F2F7B2] bg-opacity-50 flex justify-center items-end z-50">
          <div
            className={`bg-white w-full max-w-md rounded-l-[8px] rounded-r-[8px] p-4 ${
              openModal ? 'modal-animation' : ''
            }`}
          >
            <div className="flex justify-center items-center">
              <Image src={Drawar} alt="Drawer" width={36} height={4} />
            </div>

            {openModal === 'dropdownJobFunction' && (
              <>
                <div className="flex justify-between items-center h-[48px] ">
                  <h2 className="text-[18px] font-[600] text-[#373A36]">
                    Job Function
                  </h2>
                  <button
                    className="h-[24px] w-[24px]"
                    onClick={() => setOpenModal(null)}
                  >
                    <Image src={Close} alt="Close" width={24} height={24} />
                  </button>
                </div>
                <ul>
                  {jobFunctionOptions.map((option, index) => (
                    <li key={index}>
                      <button
                        className="h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] font-[500]"
                        onClick={() => handleJobFunctionSelection(option)}
                      >
                        {option}
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
                    <Image src={Close} alt="Close" width={24} height={24} />
                  </button>
                </div>
                <ul>
                  {priceRanges?.map((priceRange, index) => (
                    <li key={index}>
                      <button
                        className="h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] font-[500]"
                        onClick={() => togglePriceSelection(priceRange)}
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
                    <Image src={Close} alt="Close" width={24} height={24} />
                  </button>
                </div>
                <ul>
                  {['Highest rated', 'Most hires', 'Most recent'].map(
                    (ratingOption, index) => (
                      <li key={index}>
                        <button
                          className="h-[48px] w-[auto] text-[#373A36] flex justify-center items-center text-[16px] font-[500]"
                          onClick={() => handleHighestRatedSelection(ratingOption)}
                        >
                          {ratingOption}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center gap-[16px] pl-[16px] pr-[16px] pt-[16px] bg-white md:bg-[#F5F5F5] min-h-screen">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => handleEmployeeClick(employee.id)}
              onServiceSelect={handleServiceSelect}
            />
          ))
        ) : (
          <div>No employees match the selected filters.</div>
        )}
      </div>
    </>
  );
};

export default CompanyDetails;

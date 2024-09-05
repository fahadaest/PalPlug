import { useState } from "react";
import RotatingIcon from "./icon";


export default function ProfessionalInfo({ professionalInfo, setProfessionalInfo }) {
  const [dropdowns, setDropdowns] = useState({
    occupation: false,
    country: false,
    college: false,
    major: false,
    year: false,
    certificate: false,
    certificationFrom: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOptionChange = (section, value) => {
    setProfessionalInfo((prev) => ({
      ...prev,
      [section]: prev[section].includes(value)
        ? prev[section].filter((item) => item !== value)
        : [...prev[section], value],
    }));
  };

  const handleDropdownClick = (e) => {
  
    e.preventDefault();
  };

  return (
    <div
        className="bg-white font-roboto max-w-4xl mx-auto p-8"
        onClick={handleDropdownClick}
    >
        <h1 className="text-[24px] font-[600] leading-[32px]">
            Professional Info
        </h1>
        <p className="text-[14px] font-[400] leading-[20px] pt-2 text-[#939393]">
            This is your time to shine. Let potential candidates/customers
            know what you do best and how you gained your skills,
            certifications, and experience.
        </p>

        {/* Occupation Section */}
        <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
                Your Occupation
            </label>
            <div className="relative w-full md:w-[276px]">
                <button
                    onClick={() => toggleDropdown('occupation')}
                    className="flex justify-between items-center w-full h-[48px] text-[#4A504B] bg-white border border-[#DFDFDF] px-4 py-2 rounded-md leading-tight "
                >
                    Select Occupation
                    <div className="h-[16px] w-[16px] bg-[#F0F0F0] rounded-full flex justify-center items-center">
                        <RotatingIcon />
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </button>
                {dropdowns.occupation && (
                    <div
                        className="border border-gray-400 rounded mt-1"
                        onClick={handleDropdownClick}
                    >
                        {['Option 1', 'Option 2', 'Option 3'].map(
                            (option) => (
                                <label
                                    key={option}
                                    className="block px-4 py-2"
                                >
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={professionalInfo.occupation.includes(
                                            option
                                        )}
                                        onChange={() =>
                                            handleOptionChange(
                                                'occupation',
                                                option
                                            )
                                        }
                                    />
                                    {option}
                                </label>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* {/ Education Section /} */}
        <div className="mb-6">
            <label className="text-lg font-semibold mb-2">Education</label>
            <div className="flex flex-col md:flex-row gap-2 mb-4">
                {/* Country Dropdown */}
                <div className="relative w-full md:w-[336px]">
                    <button
                        onClick={() => toggleDropdown('country')}
                        className="w-full h-[48px] flex justify-between items-center text-[16px] text-[#4A504B] bg-white border px-4 py-2 rounded-md leading-tight "
                    >
                        College/University
                        <RotatingIcon />
                    </button>
                    {dropdowns.country && (
                        <div
                            className="border border-gray-400 rounded mt-1"
                            onClick={handleDropdownClick}
                        >
                            {['Option 1', 'Option 2', 'Option 3'].map(
                                (option) => (
                                    <label
                                        key={option}
                                        className="block px-4 py-2"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={professionalInfo.country.includes(
                                                option
                                            )}
                                            onChange={() =>
                                                handleOptionChange(
                                                    'country',
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* College Dropdown */}
                <div className="relative w-full md:w-[336px]">
                    <button
                        onClick={() => toggleDropdown('college')}
                        className="w-full h-[48px] flex justify-between items-center text-[16px] text-[#4A504B] bg-white border px-4 py-2 rounded-md leading-tight "
                    >
                        College/University Name
                        <RotatingIcon />
                    </button>
                    {dropdowns.college && (
                        <div
                            className="border border-gray-400 rounded mt-1"
                            onClick={handleDropdownClick}
                        >
                            {['Option 1', 'Option 2', 'Option 3'].map(
                                (option) => (
                                    <label
                                        key={option}
                                        className="block px-4 py-2"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={professionalInfo.college.includes(
                                                option
                                            )}
                                            onChange={() =>
                                                handleOptionChange(
                                                    'college',
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-4">
                {/* Major Dropdown */}
                <div className="relative w-full md:w-[134px]">
                    <button
                        onClick={() => toggleDropdown('major')}
                        className="w-full h-[48px] flex justify-between items-center text-[16px] text-[#4A504B] bg-white border px-4 py-2 rounded-md leading-tight "
                    >
                        Major
                        <RotatingIcon />
                    </button>
                    {dropdowns.major && (
                        <div
                            className="border border-gray-400 rounded mt-1"
                            onClick={handleDropdownClick}
                        >
                            {['Option 1', 'Option 2', 'Option 3'].map(
                                (option) => (
                                    <label
                                        key={option}
                                        className="block px-4 py-2"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={professionalInfo.major.includes(
                                                option
                                            )}
                                            onChange={() =>
                                                handleOptionChange(
                                                    'major',
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* Year Dropdown */}
                <div className="relative w-full md:w-[133px]">
                    <button
                        onClick={() => toggleDropdown('year')}
                        className="w-full h-[48px] flex justify-between items-center text-[16px] text-[#4A504B] bg-white border px-4 py-2 rounded-md leading-tight "
                    >
                        Year
                        <RotatingIcon />
                    </button>
                    {dropdowns.year && (
                        <div
                            className="border border-gray-400 rounded mt-1"
                            onClick={handleDropdownClick}
                        >
                            {['Option 1', 'Option 2', 'Option 3'].map(
                                (option) => (
                                    <label
                                        key={option}
                                        className="block px-4 py-2"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={professionalInfo.year.includes(
                                                option
                                            )}
                                            onChange={() =>
                                                handleOptionChange(
                                                    'year',
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

          
        </div>

        {/* {/ Certification Section /} */}
        <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
                Certification
            </label>
            <div className="flex flex-col md:flex-row gap-2 mb-4">
                {/* Certificate Dropdown */}
                <div className="relative w-full md:w-[336px]">
                    <button
                        onClick={() => toggleDropdown('certificate')}
                        className="flex justify-between items-center h-[48px] w-full text-[16px] text-[#4A504B] bg-white border px-4 py-2 rounded-md leading-tight "
                    >
                        Certificate or Award
                        <RotatingIcon />
                    </button>

                    {dropdowns.certificate && (
                        <div
                            className="border border-gray-400 rounded mt-1"
                            onClick={handleDropdownClick}
                        >
                            {['Option 1', 'Option 2', 'Option 3'].map(
                                (option) => (
                                    <label
                                        key={option}
                                        className="block px-4 py-2"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={professionalInfo.certificate.includes(
                                                option
                                            )}
                                            onChange={() =>
                                                handleOptionChange(
                                                    'certificate',
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* Certification From Dropdown */}
                <div className="relative w-full md:w-[336px]">
                    <button
                        onClick={() => toggleDropdown('certificationFrom')}
                        className="flex justify-between items-center h-[48px] w-full text-[16px] text-[#4A504B] bg-white border px-4 py-2 rounded-md leading-tight "
                    >
                        Certification From
                        <RotatingIcon />
                    </button>
                    {dropdowns.certificationFrom && (
                        <div
                            className="border border-gray-400 rounded mt-1"
                            onClick={handleDropdownClick}
                        >
                            {['Option 1', 'Option 2', 'Option 3'].map(
                                (option) => (
                                    <label
                                        key={option}
                                        className="block px-4 py-2"
                                    >
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={professionalInfo.certificationFrom.includes(
                                                option
                                            )}
                                            onChange={() =>
                                                handleOptionChange(
                                                    'certificationFrom',
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
}

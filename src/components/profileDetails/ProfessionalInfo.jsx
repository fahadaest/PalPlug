import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownComponent from './DropdownComponent';
import { fetchCountries } from '@/app/redux/action';



export default function ProfessionalInfo({ professionalInfo, setProfessionalInfo, onValidationChange }) {
    const [educationSections, setEducationSections] = useState([{country: '', college: '', major: '', year: ''}]);
    const [certificationSections, setCertificationSections] = useState([{certificate: '', certification: '', year: ''}]);
    const [isValid, setIsValid] = useState(false); // Add state for validation
    

    const dispatch = useDispatch();
    const { countries, loading } = useSelector((state) => state.countries);

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            setProfessionalInfo((prev) => ({ ...prev, occupation: '', employer: '' }));
        };
    }, [setProfessionalInfo]);

    const handleOptionChange = (dropdownKey, updatedOptions, sectionIndex, type) => {
        if (type === "education") {
            const updatedSections = [...educationSections];
            updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], [dropdownKey]: updatedOptions };
            setEducationSections(updatedSections);
        } else if (type === "certification") {
            const updatedSections = [...certificationSections];
            updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], [dropdownKey]: updatedOptions };
            setCertificationSections(updatedSections);
        } else {
            setProfessionalInfo((prev) => ({ ...prev, [dropdownKey]: updatedOptions }));
        }
        validateForm();
    };


    const addEducationSection = () => {
        setEducationSections([...educationSections, { country: '', college: '', major: '', year: '' }]);
    };
    const removeEducationSection = (index) => {
        if (educationSections.length > 1) {
            const updatedSections = educationSections.filter((_, i) => i !== index);
            setEducationSections(updatedSections);
        } else {
            const resetSection = { country: '', college: '', major: '', year: '' };
            const updatedSections = [...educationSections];
            updatedSections[index] = resetSection;
            setEducationSections(updatedSections);
        }
    };

    const addCertificationSection = () => {
        setCertificationSections([...certificationSections, { certificate: '', certification: '', year: '' }]);
    };
    const removeCertificationSection = (index) => {
        if (certificationSections.length > 1) {
            const updatedSections = certificationSections.filter((_, i) => i !== index);
            setCertificationSections(updatedSections);
        } else {
            const resetSection = { certificate: '', certification: '', year: '' };
            const updatedSections = [...certificationSections];
            updatedSections[index] = resetSection;
            setCertificationSections(updatedSections);
        }
    };

    const handleDropdownClick = (e) => {
        e.preventDefault();
    };

    //
    const validateForm = () => {
        const hasOccupation = professionalInfo.occupation !== ""         /*.length > 0 && professionalInfo.occupation[0] !== "" */;
        const hasEmployer = professionalInfo.employer !== ""             /*.length > 0 && professionalInfo.employer[0] !== "" */;

        const hasEducation = educationSections.some(section =>
            section.country !== "" || section.college !== "" || section.major !== "" || section.year !== ""
        );

        const hasCertification = certificationSections.some(section =>
            section.certificate !== "" || section.certification !== "" || section.year !== ""
        );

        const formIsValid = hasOccupation || hasEmployer || hasEducation || hasCertification;
        setIsValid(formIsValid);
        onValidationChange(formIsValid); // Pass validation status back to ProfileInfo
    };

    useEffect(() => {
        validateForm(); // Initial validation
    }, [professionalInfo, educationSections, certificationSections]);

    //


    return (
        <div
            className="w-auto max-w-[1154px] flex flex-col gap-[24px]"
            onClick={handleDropdownClick}
        >
            <div className='flex flex-col w-full max-w-[632px] gap-[16px]'>

                <h1 className="text-[24px] font-[600] leading-[32px]">
                    Professional Info
                </h1>
                <p className="text-[14px] font-[400] leading-[20px] pt-2 text-[#939393]">
                    This is your time to shine. Let potential candidates/customers
                    know what you do best and how you gained your skills,
                    certifications, and experience.
                </p>

                <div className="border-[#F0F0F0] border w-auto max-w-[640px]"></div>


            </div>
            <div className="flex flex-col gap-[8px]">
                <label className="block text-[14px] font-[600]">
                    Your Occupation
                </label>
                <div className="w-auto max-w-[358px] md:w-[276px]">
                    <DropdownComponent
                        options={['Option 1', 'Option 2', 'Option 3']}
                        selectedOption={professionalInfo.occupation}
                        onOptionChange={(updatedOptions) => handleOptionChange('occupation', updatedOptions, null, 'occupation')}
                        dropdownKey="occupation"
                        label="Select Occupation"
                        width="100%"
                    />
                </div>
            </div>

            <div className='flex gap-[8px] flex-col md:flex-row'>
                <div className="flex flex-col gap-[8px]">
                    <label className="block text-[14px] font-[600]">
                        Your Employer
                    </label>
                    <div className="w-auto md:w-[358px] max-w-[358px]">
                        <DropdownComponent
                            options={['Employer 1', 'Employer 2', 'Employer 3']}
                            selectedOption={professionalInfo.employer}
                            onOptionChange={(updatedOptions) => handleOptionChange('employer', updatedOptions, null, 'employee')}
                            dropdownKey="employer"
                            label="Select Employer"
                            width="100%"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                    <label className="block text-[14px] font-[600]">
                        Work Email
                    </label>
                    <input 
                        placeholder='Ex: j.appleseed@google.com'
                    className="w-auto outline-none font-lightbold text-base text-[#939393] max-w-[358px] p-[12px] h-[48px] border border-[#D5D4DC] rounded-lg">
                    </input>
                </div>
            </div>


            <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-[600]">Education</label>
                {educationSections.map((section, index) => (
                    <div key={index} className="flex flex-col gap-[8px]">
                        <div className="flex flex-col md:flex-row  gap-[8px] w-auto max-w-[358px] md:max-w-[672px] md:w-auto">
                            <DropdownComponent
                                options={countries.map((country) => country.name)}
                                selectedOption={section.country}
                                onOptionChange={(updatedOptions) =>
                                    handleOptionChange("country", updatedOptions, index, "education")
                                }
                                dropdownKey="country"
                                label="Select Country"
                                loading={loading}
                                width="100%"
                            />
                            <DropdownComponent
                                options={["Option 1", "Option 2", "Option 3"]}
                                selectedOption={section.college}
                                onOptionChange={(updatedOptions) =>
                                    handleOptionChange("college", updatedOptions, index, "education")
                                }
                                dropdownKey="college"
                                label="Select College"
                                width="100%"
                            />
                        </div>
                        <div className="flex flex-row gap-[8px]">
                            <div className='w-[217px] md:max-w-[234px]'>
                                <DropdownComponent
                                    options={["Option 1", "Option 2", "Option 3"]}
                                    selectedOption={section.major}
                                    onOptionChange={(updatedOptions) =>
                                        handleOptionChange("major", updatedOptions, index, "education")
                                    }
                                    dropdownKey="major"
                                    label="Select Major"
                                    width="100%"
                                />
                            </div>
                            <div className='w-auto max-w-[133px]'>
                                <DropdownComponent
                                    options={["Option 1", "Option 2", "Option 3"]}
                                    selectedOption={section.year}
                                    onOptionChange={(updatedOptions) =>
                                        handleOptionChange("year", updatedOptions, index, "education")
                                    }
                                    dropdownKey="year"
                                    label="Year"
                                    width="133px"
                                />
                            </div>
                        </div>
                        <div className='flex gap-[8px] md:gap-[16px]'>
                            <button
                                className="bg-[#939393] text-white   p-[11px_20px_11px_20px] rounded-[8px] w-full md:w-[111px]"
                                onClick={addEducationSection}
                            >
                                Add
                            </button>
                            <button
                                className="bg-[#EB5757] text-white  p-[11px_20px_11px_20px] rounded-[8px] w-full md:w-[111px]"
                                onClick={() => removeEducationSection(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-[8px] flex-col">
                <label className="block text-[14px] font-[600]">Certification</label>
                {certificationSections.map((section, index) => (
                    <div key={index} className="flex gap-[8px] flex-col">
                        <div className="w-auto max-w-[672px] flex gap-[8px] flex-col md:flex-row">
                            <DropdownComponent
                                options={["Option 1", "Option 2", "Option 3"]}
                                selectedOption={section.certificate}
                                onOptionChange={(updatedOptions) =>
                                    handleOptionChange("certificate", updatedOptions, index, "certification")
                                }
                                dropdownKey="certificate"
                                label="Select Certificate"
                                width="100%"
                            />
                            <DropdownComponent
                                options={["Option 1", "Option 2", "Option 3"]}
                                selectedOption={section.certification}
                                onOptionChange={(updatedOptions) =>
                                    handleOptionChange("certification", updatedOptions, index, "certification")
                                }
                                dropdownKey="certification"
                                label="Select Certification"
                                width="100%"
                            />
                        </div>
                        <div className="w-[160px] flex flex-col  md:flex-row">
                            <DropdownComponent
                                options={["Option 1", "Option 2", "Option 3"]}
                                selectedOption={section.year}
                                onOptionChange={(updatedOptions) =>
                                    handleOptionChange("year", updatedOptions, index, "certification")
                                }
                                dropdownKey="year"
                                label="Year"
                                width="100%"
                            />
                        </div>
                        <div className='flex gap-[8px]'>
                            <button
                                className="bg-[#939393] text-white  p-[11px_20px_11px_20px] rounded w-full md:w-[111px]"
                                onClick={addCertificationSection}
                            >
                                Add
                            </button>
                            <button
                                className="bg-[#EB5757] text-white p-[11px_20px_11px_20px] rounded w-full md:w-[111px]"
                                onClick={() => removeCertificationSection(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>

                ))}
                
            </div>
        </div>
    );
}

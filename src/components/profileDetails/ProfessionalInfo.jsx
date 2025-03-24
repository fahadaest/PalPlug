import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownComponent from './DropdownComponent';
import { fetchCountries } from '@/app/redux/action';
import { fetchColleges } from '@/app/redux/action';
import { fetchYears } from '@/app/redux/action';
import { fetchUserRoles } from '@/app/redux/action';

export default function ProfessionalInfo({ professionalInfo, setProfessionalInfo, onValidationChange }) {
    const [educationSections, setEducationSections] = useState([{ country: '', college: '', major: '', year: '' }]);
    const [certificationSections, setCertificationSections] = useState([{ certificate: '', certification: '', year: '' }]);
    const [isValid, setIsValid] = useState(false);

    const dispatch = useDispatch();
    const { countries, loading: countriesLoading } = useSelector((state) => state.countries);
    const { colleges, loading: collegesLoading } = useSelector((state) => state.colleges);
    const { years, loading: yearsLoading } = useSelector((state) => state.years);
    const { roles, loading: rolesLoading } = useSelector((state) => state.userRoles);

    const fallbackYears = years && years.length > 0 ? years : ['Static 2020', 'Static 2021'];

    useEffect(() => {
        if (years.length === 0) {
          console.warn("No years data returned, check the API or the slice!");
        }
      }, [years]);

    useEffect(() => {
        dispatch(fetchYears());
    }, [dispatch]);

    useEffect(() => {
        if (!countries.length) {
            dispatch(fetchCountries());
        }
    }, [dispatch, countries.length]);

    useEffect(() => {
        console.log("Fetched Countries:", countries);
    }, [countries]);
    useEffect(() => {

        const colleges = dispatch(fetchColleges()); 
        console.log("colleges from store:", colleges);
    }, [countries]); 

    useEffect(() => {
        return () => {
            setProfessionalInfo((prev) => ({ ...prev, occupation: '', employer: '' }));
        };
    }, [setProfessionalInfo]);

    useEffect(() => {
        dispatch(fetchUserRoles());
    }, [dispatch]);

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
    
    const handleCountryChange = (selectedCountryName, index) => {
        handleOptionChange("country", selectedCountryName, index, "education");
        dispatch(fetchColleges(selectedCountryName))
          .unwrap()
          .then((res) => {
            console.log("fetchColleges success:", res);
          })
          .catch((err) => {
            console.error("fetchColleges error:", err);
          });
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

    const validateForm = () => {
        const hasNonEmptyField = (section, fields) =>
          fields.some(field => String(section[field] || "").trim() !== "");
        const { occupation, employer } = professionalInfo || {};
        const safeOccupation = occupation ? String(occupation) : "";
        const safeEmployer = employer ? String(employer) : "";
        const hasProfessionalInfo =
          safeOccupation.trim() !== "" || safeEmployer.trim() !== "";
        const hasEducation = educationSections.some(section =>
          hasNonEmptyField(section, ["country", "college", "major", "year"])
        );
        const hasCertification = certificationSections.some(section =>
          hasNonEmptyField(section, ["certificate", "certification", "year"])
        );
        const formIsValid = hasProfessionalInfo || hasEducation || hasCertification;
        setIsValid(formIsValid);
        onValidationChange(formIsValid);
      };
      
      
    useEffect(() => {
        validateForm();
    }, [professionalInfo, educationSections, certificationSections]);

    const collegeOptions = Array.isArray(colleges)
    ? colleges.map((college) => typeof college === 'string' ? college : college.name)
    : [];
  

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
                        options={roles.map(({ title }) => title)}
                        selectedOption={professionalInfo.occupation}
                        onOptionChange={(updatedOptions) => handleOptionChange('occupation', updatedOptions, null, 'occupation')}
                        dropdownKey="occupation"
                        label="Select Occupation"
                        width="100%"
                        loading={rolesLoading}
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
                        className="w-auto outline-none font-lightbold text-base text-[#939393] max-w-[358px] p-[12px] h-[48px] border border-[#D5D4DC] rounded-lg"
                    ></input>
                </div>
            </div>

            <div className="flex flex-col gap-[8px]">
                <label className="text-[14px] font-[600]">Education</label>
                {educationSections.map((section, index) => (
                    <div key={index} className="flex flex-col gap-[8px]">
                        <div className="flex flex-col md:flex-row  gap-[8px] w-auto max-w-[358px] md:max-w-[672px] md:w-auto">
                            <DropdownComponent
                                options={countries}
                                selectedOption={section.country}
                                onOptionChange={(selectedValue) => {
                                    console.log("Selected Country:", selectedValue);
                                    handleCountryChange(selectedValue, index);
                                }}
                                dropdownKey="country"
                                label="Select Country"
                                loading={countriesLoading}
                                width="100%"
                                className="text-black"
                            />
                           <DropdownComponent
                                options={collegeOptions}
                                selectedOption={section.college}
                                onOptionChange={(updatedOptions) =>
                                    handleOptionChange("college", updatedOptions, index, "education")
                                }
                                dropdownKey="college"
                                label="Select College"
                                loading={collegesLoading}
                                width="100%"
                            />
                        </div>
                        <div className="flex flex-row gap-[8px]">
                            <div className='w-[217px] md:max-w-[234px]'>
                                <input
                                    type="text"
                                    value={section.major}
                                    onChange={(e) =>
                                        handleOptionChange("major", e.target.value, index, "education")
                                    }
                                    placeholder="Enter Major"
                                    className="w-full border p-2 h-[48px] rounded-lg"
                                />
                            </div>
                            <div className='w-auto max-w-[133px]'>
                                 <DropdownComponent
                                    options={years}
                                    selectedOption={section.year}
                                    onOptionChange={(updatedOptions) =>
                                        handleOptionChange("year",updatedOptions, index, "education")
                                    }
                                    dropdownKey="year"
                                    label="Year"
                                    loading={yearsLoading}
                                    width="133px"
                                />
                            </div>
                        </div>
                        <div className='flex gap-[8px] md:gap-[16px]'>
                            <button
                                className="bg-[#939393] text-white p-[11px_20px] rounded-[8px] w-full md:w-[111px]"
                                onClick={addEducationSection}
                            >
                                Add
                            </button>
                            <button
                                className="bg-[#EB5757] text-white p-[11px_20px] rounded-[8px] w-full md:w-[111px]"
                                onClick={() => removeEducationSection(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-[8px]">
                <label className="block text-[14px] font-[600]">Certification</label>
                {certificationSections.map((section, index) => (
                    <div key={index} className="flex gap-[8px] flex-col">
                        <div className="w-auto max-w-[672px] flex gap-[8px] flex-col md:flex-row">
                            <div className="w-full">
                                <label className="block text-[14px] font-[600] mb-1">Select Certificate</label>
                                <input
                                    type="text"
                                    value={section.certificate}
                                    onChange={(e) =>
                                        handleOptionChange("certificate", e.target.value, index, "certification")
                                    }
                                    placeholder="Enter Certificate"
                                    className="w-full border p-2 h-[48px] rounded-lg"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-[14px] font-[600] mb-1">Select Certification</label>
                                <input
                                    type="text"
                                    value={section.certification}
                                    onChange={(e) =>
                                        handleOptionChange("certification", e.target.value, index, "certification")
                                    }
                                    placeholder="Enter Certification"
                                    className="w-full border p-2 h-[48px] rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="w-[160px] flex flex-col md:flex-row">
                            <DropdownComponent
                                options={years}
                                selectedOption={section.year}
                                onOptionChange={(updatedOptions) =>
                                    handleOptionChange("year", updatedOptions, index, "certification")
                                }
                                dropdownKey="year"
                                label="Year"
                                loading={yearsLoading}
                                width="100%"
                            />
                        </div>
                        <div className='flex gap-[8px]'>
                            <button
                                className="bg-[#939393] text-white p-[11px_20px] rounded w-full md:w-[111px]"
                                onClick={addCertificationSection}
                            >
                                Add
                            </button>
                            <button
                                className="bg-[#EB5757] text-white p-[11px_20px] rounded w-full md:w-[111px]"
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

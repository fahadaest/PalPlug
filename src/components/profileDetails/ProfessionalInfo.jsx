    import { useEffect, useState } from "react";
      import DropdownComponent from "./DropdownComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/app/redux/action";

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
    const dispatch = useDispatch();
    const { countries, loading } = useSelector((state) => state.countries);
  
    useEffect(() => {
      dispatch(fetchCountries());
    }, [dispatch]);
    const handleOptionChange = (dropdownKey, updatedOptions) => {
        setProfessionalInfo({ ...professionalInfo, [dropdownKey]: updatedOptions });
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

         
            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">
                    Your Occupation
                </label>
                <DropdownComponent
            options={['Option 1', 'Option 2', 'Option 3']}
            selectedOption={professionalInfo.occupation}
            onOptionChange={(updatedOptions) => handleOptionChange('occupation', updatedOptions)}
            dropdownKey="occupation"
            label="Select Occupation"
            width="276px"
            />
            </div>

         
            <div className="mb-6">
                <label className="text-lg font-semibold mb-2">Education</label>
                <div className="flex flex-col md:flex-row gap-2 mb-4">
                  
                    <DropdownComponent
        options={countries.map((country) => country.name)}
        selectedOption={professionalInfo.country}
        onOptionChange={(updatedOptions) => handleOptionChange('country', updatedOptions)}
        dropdownKey="country"
        label="Select Country"
        loading={loading}
        width="336px"
      />

                    <DropdownComponent
            options={['Option 1', 'Option 2', 'Option 3']}
            selectedOption={professionalInfo.college}
            onOptionChange={(updatedOptions) => handleOptionChange('college', updatedOptions)}
            dropdownKey="college"
            label="Select Collage"
            width="336px"
            />


                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-4">
                
                    <DropdownComponent
            options={['Option 1', 'Option 2', 'Option 3']}
            selectedOption={professionalInfo.major}
            onOptionChange={(updatedOptions) => handleOptionChange('major', updatedOptions)}
            dropdownKey="major"
            label="Select Major"
            width="234px"
            />
                   
                    <DropdownComponent
            options={['Option 1', 'Option 2', 'Option 3']}
            selectedOption={professionalInfo.year}
            onOptionChange={(updatedOptions) => handleOptionChange('year', updatedOptions)}
            dropdownKey="year"
            label="Select Year"
            width="160px"
            />
        

                </div>

            
            </div>

            <button
                        className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-auto"
                    >
                        Add
                    </button>
            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">
                    Certification
                </label>
                <div className=" w-[336px] flex flex-col md:flex-row gap-2 mb-4">
                
                    <DropdownComponent
            options={['Option 1', 'Option 2', 'Option 3']}
            selectedOption={professionalInfo.certificate}
            onOptionChange={(updatedOptions) => handleOptionChange('certificate', updatedOptions)}
            dropdownKey="certificate"
            label="Select Certificate"
            width="336px"
            />
        
                  
                    <DropdownComponent
            options={['Option 1', 'Option 2', 'Option 3']}
            selectedOption={professionalInfo.Certification}
            onOptionChange={(updatedOptions) => handleOptionChange('Certification', updatedOptions)}
            dropdownKey="Certification"
            label="Select Certification"
            width="336px"
            />
        


                </div>
                <div className="w-[160px] flex flex-col md:flex-row gap-2 mb-4">
        
                <DropdownComponent
            options={['Option 1', 'Option 2', 'Option 3']}
            selectedOption={professionalInfo.year}
            onOptionChange={(updatedOptions) => handleOptionChange('year', updatedOptions)}
            dropdownKey="year"
            label="Select Year"
            />


            </div>
            </div>
            <button
                        className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-auto"
                    >
                        Add
                    </button>
        </div>
    );
    }

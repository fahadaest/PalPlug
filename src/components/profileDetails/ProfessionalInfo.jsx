import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownComponent from './DropdownComponent';
import { fetchCountries, fetchColleges, fetchYears, fetchUserRoles } from '@/app/redux/action';
import { updateProfileCompletion } from '@/app/redux/slice/user/userSlice';

export default function ProfessionalInfo({ professionalInfo, setProfessionalInfo, onValidationChange }) {
  const dispatch = useDispatch();
  const [educationSections, setEducationSections] = useState([{ country: '', college: '', major: '', year: '' }]);
  const [certificationSections, setCertificationSections] = useState([{ certificate: '', certification: '', year: '' }]);
  const [isValid, setIsValid] = useState(false);
  const [calendlyLink, setCalendlyLink] = useState('');

  const { countries, loading: countriesLoading } = useSelector((state) => state.countries);
  const { colleges, loading: collegesLoading } = useSelector((state) => state.colleges);
  const { years, loading: yearsLoading } = useSelector((state) => state.years);
  const { roles, loading: rolesLoading } = useSelector((state) => state.userRoles);

  useEffect(() => {
    dispatch(fetchYears());
    if (!countries.length) {
      dispatch(fetchCountries());
    }
    dispatch(fetchUserRoles());
  }, [dispatch, countries.length]);

  useEffect(() => {
    setProfessionalInfo((prev) => ({ ...prev, collegesArray: educationSections }));
  }, [educationSections, setProfessionalInfo]);

  useEffect(() => {
    setProfessionalInfo((prev) => ({ ...prev, certificationsArray: certificationSections }));
  }, [certificationSections, setProfessionalInfo]);

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
    setEducationSections([
      ...educationSections,
      { country: '', college: '', major: '', year: '' },
    ]);
  };

  const removeEducationSection = (index) => {
    if (educationSections.length > 1) {
      const updated = educationSections.filter((_, i) => i !== index);
      setEducationSections(updated);
    } else {
      setEducationSections([{ country: '', college: '', major: '', year: '' }]);
    }
  };

  const handleCountryChange = (selectedCountry, index) => {
    handleOptionChange('country', selectedCountry, index, 'education');
    dispatch(fetchColleges(selectedCountry))
      .unwrap()
      .then((res) => console.log('fetchColleges success:', res['Colleges names']))
      .catch((err) => console.log('fetchColleges error:', err));
  };

  const addCertificationSection = () => {
    setCertificationSections([...certificationSections, { certificate: '', certification: '', year: '' }]);
  };

  const removeCertificationSection = (index) => {
    if (certificationSections.length > 1) {
      const updated = certificationSections.filter((_, i) => i !== index);
      setCertificationSections(updated);
    } else {
      setCertificationSections([{ certificate: '', certification: '', year: '' }]);
    }
  };

  const validateForm = useCallback(() => {
    const { occupation, employer, workEmail } = professionalInfo;
    const hasProfessionalInfo = Boolean(occupation || employer || workEmail);

    const hasEducation = educationSections.some(
      (sec) =>
        sec.country.trim() ||
        sec.college.trim() ||
        sec.major.trim() ||
        sec.year.toString().trim()
    );

    const hasCertification = certificationSections.some(
      (sec) =>
        sec.certificate.trim() ||
        sec.certification.trim() ||
        sec.year.toString().trim()
    );

    const formIsValid = hasProfessionalInfo || hasEducation || hasCertification;
    setIsValid(formIsValid);
    onValidationChange(formIsValid);
  }, [professionalInfo, educationSections, certificationSections, onValidationChange]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleCalendlyChange = (e) => {
    const link = e.target.value;
    setCalendlyLink(link);
    setProfessionalInfo((prev) => ({ ...prev, calendlyLink: link }));
  };

  const validateCalendlyLink = (link) => {
    return link.startsWith('https://calendly.com/') || link === '';
  };

  return (
    <div className="w-auto max-w-[1154px] flex flex-col gap-[24px]">
      <div className='flex flex-col w-full max-w-[632px] gap-[16px]'>
        <h1 className="text-[24px] font-[600] leading-[32px]">Professional Info</h1>
        <p className="text-[14px] font-[400] leading-[20px] pt-2 text-[#939393]">
          This is your time to shine. Let potential candidates/customers know what you do best and how you gained your skills, certifications, and experience.
        </p>
        <div className="border-[#F0F0F0] border w-auto max-w-[640px]"></div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <label className="block text-[14px] font-[600]">Your Occupation</label>
        <div className="w-auto max-w-[358px] md:w-[276px]">
          <DropdownComponent
            options={roles.map(({ title }) => title)}
            selectedOption={professionalInfo.occupation}
            onOptionChange={(val) => handleOptionChange('occupation', val, null, 'occupation')}
            dropdownKey="occupation"
            label="Select Occupation"
            width="100%"
            loading={rolesLoading}
          />
        </div>
      </div>

      <div className='flex gap-[8px] flex-col md:flex-row'>
        <div className="flex flex-col gap-[8px]">
          <label className="block text-[14px] font-[600]">Your Employer</label>
          <div className="w-auto md:w-[358px] max-w-[358px]">
            <DropdownComponent
              options={['Employer 1', 'Employer 2', 'Employer 3']}
              selectedOption={professionalInfo.employer}
              onOptionChange={(val) => handleOptionChange('employer', val, null, 'employee')}
              dropdownKey="employer"
              label="Select Employer"
              width="100%"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="block text-[14px] font-[600]">Work Email</label>
          <input
            type="email"
            placeholder="Ex: j.appleseed@google.com"
            className="outline-none font-lightbold text-base text-[#939393] w-[358px] p-[12px] h-[48px] border border-[#D5D4DC] rounded-lg focus:border-[#005382] focus:outline-none"
            value={professionalInfo.workEmail || ''}
            onChange={(e) =>
              setProfessionalInfo({ ...professionalInfo, workEmail: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <label className="block text-[14px] font-[600]">Calendly Link</label>
        <div className="relative w-auto md:w-[358px] max-w-[358px]">
          <input
            type="url"
            value={calendlyLink}
            onChange={handleCalendlyChange}
            placeholder='https://calendly.com/your-username'
            className={`w-full outline-none font-lightbold text-base text-[#939393] p-[12px] h-[48px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none ${calendlyLink && !validateCalendlyLink(calendlyLink)
              ? 'border-red-500'
              : 'border-[#D5D4DC]'
              } rounded-lg`}
          />
          {calendlyLink && !validateCalendlyLink(calendlyLink) && (
            <p className="absolute text-[12px] text-red-500 mt-1">
              Please enter a valid Calendly link (https://calendly.com/...)
            </p>
          )}
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
                onOptionChange={(val) => handleCountryChange(val, index)}
                dropdownKey="country"
                label="Select Country"
                loading={countriesLoading}
                width="100%"
                searchable={true}
              />
              <DropdownComponent
                options={colleges}
                selectedOption={section.college}
                onOptionChange={(val) => handleOptionChange('college', val, index, 'education')}
                dropdownKey="college"
                label="Select College"
                loading={collegesLoading}
                width="100%"
                searchable={true}
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
                  className="w-full border p-2 h-[48px] rounded-lg border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                />
              </div>
              <div className='w-[217px] md:max-w-[234px]'>
                <DropdownComponent
                  options={years}
                  selectedOption={section.year}
                  onOptionChange={(val) => handleOptionChange('year', val, index, 'education')}
                  dropdownKey="year"
                  label="Select Year"
                  loading={yearsLoading}
                  width="100%"
                />
              </div>
            </div>
            {educationSections.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducationSection(index)}
                className="mt-[8px] text-red-500"
              >
                Remove Education Section
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addEducationSection}
          className="text-blue-500 mt-[8px]"
        >
          Add Education Section
        </button>
      </div>

      <div className="flex flex-col gap-[8px]">
        <label className="text-[14px] font-[600]">Certifications</label>
        {certificationSections.map((section, index) => (
          <div key={index} className="flex flex-col gap-[8px]">
            <div className="flex flex-row gap-[8px]">
              <div className="w-full">
                <input
                  type="text"
                  value={section.certificate}
                  onChange={(e) =>
                    handleOptionChange('certificate', e.target.value, index, 'certification')
                  }
                  placeholder="Enter Certificate Name"
                  className="w-full p-2 border rounded-lg border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                />
              </div>
              <div className="w-[217px] md:max-w-[234px]">
                <input
                  type="text"
                  value={section.certification}
                  onChange={(e) =>
                    handleOptionChange('certification', e.target.value, index, 'certification')
                  }
                  placeholder="Certification Authority"
                  className="w-full p-2 border rounded-lg border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                />
              </div>
              <div className="w-[217px] md:max-w-[234px]">
                <DropdownComponent
                  options={years}
                  selectedOption={section.year}
                  onOptionChange={(val) => handleOptionChange('year', val, index, 'certification')}
                  dropdownKey="year"
                  label="Year of Certification"
                  loading={yearsLoading}
                  width="100%"
                />
              </div>
            </div>
            {certificationSections.length > 1 && (
              <button
                type="button"
                onClick={() => removeCertificationSection(index)}
                className="mt-[8px] text-red-500"
              >
                Remove Certification Section
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addCertificationSection}
          className="text-blue-500 mt-[8px]"
        >
          Add Certification Section
        </button>
      </div>

      <div className="flex flex-row gap-[8px]">
        <div className="flex flex-col gap-[8px]">
          <label className="block text-[14px] font-[600]">Select Role</label>
          <DropdownComponent
            options={roles.map(({ title }) => title)}
            selectedOption={professionalInfo.role}
            onOptionChange={(val) => handleOptionChange('role', val, null, 'role')}
            dropdownKey="role"
            label="Select Role"
            width="100%"
          />
        </div>
      </div>

      <div className="mt-[24px]">
        <button
          disabled={!isValid}
          className={`w-full text-white rounded-[12px] bg-[#005382] py-[12px] ${
            isValid ? '' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}

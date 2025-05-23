'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneIcon from '@/assets/images/VPhone.svg';
import EmailIcon from '@/assets/images/VEmail.svg';
import PhoneVerifyModal from '../phoneVerify';
import { setCurrentStep, setPlugRoute,} from '@/app/redux/slice/user/userSlice';
import ProfessionalInfo from './ProfessionalInfo';
import { submitProfileData } from '@/app/redux/slice/submitProfileData/profileSubmitSlice';
import ServicesSelection from './servicePage';
import { saveServices } from '@/app/utils/storage';
const ProfileInfo = ({ userId, displayName }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.user.currentStep);
  const isPlugRoute = useSelector((state) => state.user.isplugroute);
  const router = useRouter();
  const pathname = window.location.pathname;
  const isPalProfileRoute = pathname.includes('/palprofile');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [description, setDescription] = useState(''); 
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isServicesSelectionVisible, setServicesSelectionVisible] = useState(false);
  const isVerificationComplete = useSelector((state) => state.user.isVerificationComplete);
  const [isProfessionalInfoValid, setIsProfessionalInfoValid] = useState(false); 
  const [isAccountSecurityValid, setIsAccountSecurityValid] = useState(false);
  const verifiedPhone = useSelector((state) => state.user.verifiedPhone);
  const [professionalInfo, setProfessionalInfo] = useState({
    occupation: '' ,
    employer: '' ,
    workEmail: '',  
    country: '',
    college: '',
    major: '',
    education_year: null,
    colleges: [],
    certifications: [],
    certification_year: null,
  });
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };
  const handleContinue = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (currentStep === 1) {
      dispatch(setCurrentStep(2));
    } else if (currentStep === 2) {
      dispatch(setCurrentStep(3));
    }
  };
  const handleFinish = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const payloadData = {
        phone: verifiedPhone || 'N/A',
        firstName: firstName,
        lastName: lastName,
        description: description,
        profilePicture: profilePicture,
        work_email: professionalInfo.workEmail,
        calendly_link: professionalInfo.calendlyLink || '',
        isPlug: isPlugRoute,
        profile_type: isPlugRoute ? 1 : 2, // Use isPlugRoute from Redux state
        professionalInfo: {
          occupation: professionalInfo.occupation,
          employer: professionalInfo.employer,
          workEmail: professionalInfo.workEmail,
          collegesArray: professionalInfo.collegesArray,
          certificationsArray: professionalInfo.certificationsArray,
        },
        services: [],
        order_requirements: [],
        form_w9_confirmation: false,
      };
      const { profilePicture: _pic, ...storagePayload } = payloadData;
      saveServices(storagePayload);


      const result = await dispatch(submitProfileData(payloadData)).unwrap();
      
      if (result.profile_type === 1) {
        setServicesSelectionVisible(true);
      } else if (result.profile_type === 2) {
        router.push('/candidate-profile');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };
  const handleOpenPhoneModal = (event) => {
    event.preventDefault();
    setIsPhoneModalOpen(true);
  };
  const handleClosePhoneModal = () => setIsPhoneModalOpen(false);
  useEffect(() => {
    if (isVerificationComplete) {
      setIsPhoneModalOpen(false);
      setIsAccountSecurityValid(true); 
    }else {
      setIsAccountSecurityValid(false); 
  }
  }, [isVerificationComplete]);
  
  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '';
  const firstInitial = displayName ? displayName.charAt(0).toUpperCase() : 'S';
  return (
    <>
      {!isServicesSelectionVisible ? (
        <form className="pl-[16px] pt-[24px] pr-[16px] md:p-20" onSubmit={currentStep === 3 ? handleFinish : handleContinue}>
          {currentStep === 1 && (
            <div className="flex flex-col gap-[24px]">
              <div className="w-auto min-w-[354px] max-w-[698px] h-[107px] sm:h-[84px] flex gap-[16px] flex-col">
                <div className='flex flex-col gap-[8px]'>
                  <h1 className="text-2xl leading-[32px] font-semibold">Personal Info</h1>
                  <p className="text-[14px] font-lightbold leading-[16.8px]  text-[#939393]">
                    Tell us a bit about yourself. This information will appear on your
                    public profile, so that buyers can get to know you.
                  </p>
                </div>
                <div className="border-[#F0F0F0] border w-auto max-w-[640px]"></div>
              </div>
              <div className="flex flex-col gap-[24px] md:flex-row md:w-[703px] justify-between">
                <div className="w-auto max-w-[328px] flex flex-col gap-[10px]">
                  <h5 className="text-[14px] font-semibold">First Name</h5>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-[328px] h-[48px] border border-[#E5E7EB] rounded-[8px] p-[12px] focus:border-[#005382] focus:outline-none placeholder-[#939393]"
                    placeholder="Ex. John"
                    required
                  />
                </div>
                <div className="w-auto max-w-[328px] flex flex-col gap-[10px]">
                  <h5 className="text-[14px] font-semibold">Last Name</h5>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-[328px] h-[48px] border border-[#E5E7EB] rounded-[8px] p-[12px] focus:border-[#005382] focus:outline-none placeholder-[#939393]"
                    placeholder="Ex. Smith"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <h5 className="text-[14px] font-semibold">Profile Picture</h5>
                <div
                  className="border rounded-full w-36 h-36 mt-4 bg-[#D9D9D9] flex justify-center items-center cursor-pointer"
                  onClick={() => document.getElementById('profilePictureInput').click()}
                >
                  {profilePicture ? (
                    <img
                      src={URL.createObjectURL(profilePicture)}
                      alt="Profile Picture"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <h1 className="text-white text-3xl md:text-7xl font-bold">
                      {firstInitial}
                    </h1>
                  )}
                </div>
                <input
                  type="file"
                  id="profilePictureInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </div>
              <div className="w-auto md:w-[703px] flex flex-col gap-[8px]">
                <h5 className="text-[14px] mb-1 font-semibold">Description/Bio</h5>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-[8px] h-[147px] p-3 text-[16px] font-[400] placeholder-[#939393] focus:border-[#005382] focus:outline-none"
                  placeholder="Share a bit about your work experience, cool projects you've completed, and your area of expertise to show candidates."
                />
                <p className="text-[12px] text-[#939393] mt-[4px]">
                  min. 150 characters
                </p>
              </div>
              <button
                type="submit"
                className={`h-[40px] w-auto max-w-[358px] md:w-[175px] p-[11px_20px_11px_20px] ${isFormValid ? 'bg-[#005580] cursor-pointer' : 'bg-[#CCDDE6] cursor-not-allowed'} text-white text-[12px] font-[600] rounded-[8px]`}
                disabled={!isFormValid}
              >
                Continue
              </button>
            </div>
          )}
          {currentStep === 2 && (
            <>
              <ProfessionalInfo professionalInfo={professionalInfo} setProfessionalInfo={setProfessionalInfo} onValidationChange={setIsProfessionalInfoValid} /> 
              <div className="w-auto max-w-[358px] md:w-[175px] mt-8 md:mt-[100px]">
                <button
                  type="submit"
                  className={`h-[40px] w-[100%] p-[11px_20px_11px_20px] ${isProfessionalInfoValid ? 'bg-[#005580] cursor-pointer' : 'bg-[#CCDDE6] cursor-not-allowed'} text-white text-[12px] font-[600] rounded-[8px]`}
                  disabled={ !isProfessionalInfoValid } 
                >
                  Continue
                </button>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[16px] max-w-[632px]">
                <h1 className="text-xl font-bold">Account Security</h1>
                <p className="text-sm text-[#939393] pb-4">
                  Trust and safety is a big deal in our community. Please verify your email and phone number so that we can keep your account secured.
                </p>
                <div className=" w-full border"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-nowrap flex-row gap-[16px]">
                  <img src={EmailIcon.src} alt="Email" className="h-[24px] w-[18px]" />
                  <span className="text-[14px] font-lightbold text-[#000000]">Email</span>
                  <span className="text-[14px] italic font-lightbold text-[#555555]">Private</span>
                </div>
                <button disabled className="h-[40px] text-[#555555] text-[12px] font-[600] w-[120px] bg-[#6FCF97]  rounded-[8px]">
                  Verified
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-nowrap flex-row gap-[16px]">
                  <img src={PhoneIcon.src} alt="Phone" className="h-[16.55px] w-[16.55px]" />
                  <span className="text-[14px] font-lightbold text-[#000000]">Phone Number</span>
                  <span className="text-[14px] italic font-lightbold text-[#555555]">Private</span>
                </div>
                {isVerificationComplete ? (
                  <button disabled className="h-[40px] text-[#555555] text-[12px] font-[600] w-[120px] bg-[#6FCF97]  rounded-[8px]">
                    Verified
                  </button>
                ) : (
                  <button
                    className="h-[40px] text-[#555555] text-[12px] font-[600]  w-[146px]  md:w-[191px] border border-[#555555] rounded-[8px]"
                    onClick={handleOpenPhoneModal}
                  >
                    Add Phone Number
                  </button>
                )}
              </div>
              <div className="w-auto max-w-[358px] md:w-[175px] mt-[300px]">
                <button
                  type="submit"
                  className={`text-[white] ${isAccountSecurityValid ? 'bg-[#005382] cursor-pointer' : 'bg-[#CCDDE6] cursor-not-allowed'} mx-auto text-[12px] p-[11px_20px_11px_20px] font-[600] w-full rounded-[8px]`}
                  disabled={!isAccountSecurityValid} 
                >
                  Finish
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <ServicesSelection />
      )}
      {isPhoneModalOpen && (
        <PhoneVerifyModal
          isOpen={isPhoneModalOpen}
          onClose={handleClosePhoneModal}
        />
      )}
    </>
  );
};
export default ProfileInfo;
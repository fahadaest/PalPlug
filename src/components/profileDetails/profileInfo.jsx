'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneIcon from '@/assets/images/phone.svg';
import EmailIcon from '@/assets/images/email.svg';
import PhoneVerifyModal from '../phoneVerify';
import { setCurrentStep,setPlugRoute,submitProfileInfo } from '@/app/redux/slice/user/userSlice';
import ProfessionalInfo from './ProfessionalInfo';
import { submitProfile } from '@/app/redux/action';
import ServicesSelection from './servicePage';

const ProfileInfo = ({ userId, displayName }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.user.currentStep);
  const isPlugRoute = useSelector((state) => state.user.isplugroute);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [description, setDescription] = useState('');
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isServicesSelectionVisible, setServicesSelectionVisible] = useState(false);
  const isVerificationComplete = useSelector((state) => state.user.isVerificationComplete); 
 
  const router = useRouter();

 
  const [professionalInfo, setProfessionalInfo] = useState({
    occupation: [],
    country: [],
    college: [],
    major: [],
    year: [],
    certificate: [],
    certificationFrom: [],
  });
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
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

 const handleFinish = (event) => {
  event.preventDefault();
  event.stopPropagation();
  
  const formData = {
    firstName,
    lastName,
    profilePicture,
    description,
    professionalInfo,
  };
  try {
    // Dispatch form data submission
    dispatch(submitProfile(formData));

    // Conditional navigation based on isplugroute state
    if (isPlugRoute) {
      router.push('/servicesselection');
      setServicesSelectionVisible(true);
    } else {
      // If isplugroute is false, redirect to home route
      router.push('/');
      dispatch(setPlugRoute(true)); 
    }
  } catch (error) {
    console.error('Error submitting profile:', error);
  }
};


  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '';

  const firstInitial = displayName ? displayName.charAt(0).toUpperCase() : 'S';

  const handleOpenPhoneModal = (event) => {
    event.preventDefault(); 
    setIsPhoneModalOpen(true);
  };
  const handleClosePhoneModal = () => setIsPhoneModalOpen(false);
  useEffect(() => {
    if (isVerificationComplete) {
      setIsPhoneModalOpen(false);
    }
  }, [isVerificationComplete]);
  return (
    <>
    {!isServicesSelectionVisible ? (
      <form className="p-20 md:w-[682px]" onSubmit={currentStep === 3 ? handleFinish : handleContinue}>
        {currentStep === 1 && (
          <div>
            <div className="w-full md:w-[640px] mb-4">
              <h1 className="text-xl font-bold">Personal Info</h1>
              <p className="text-sm text-[#939393] pb-4">
                Tell us a bit about yourself. This information will appear on your public profile, so that buyers can get to know you.
              </p>
              <div className="w-full border"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-12 pt-4 text-[14px]">
              <div className="w-full md:w-1/2">
                <h5 className="text-[14px] font-semibold">First Name</h5>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-[42px] focus:border-blue-500 focus:outline-none w-full border rounded-lg p-2"
                  required
                />
              </div>

              <div className="w-full md:w-1/2">
                <h5 className="text-[14px] font-semibold">Last Name</h5>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-[42px] focus:border-blue-500 focus:outline-none w-full border rounded-lg p-2"
                  required
                />
              </div>
            </div>
            <div className="pt-4">
  <h5 className="text-[14px] font-semibold">Profile Picture</h5>
  <div
    className="border rounded-full w-36 h-36 mt-4 bg-[#D9D9D9] flex justify-center items-center cursor-pointer"
    onClick={() => document.getElementById('profilePictureInput').click()}
  >
    {profilePicture ? (
      <img src={profilePicture} alt="Profile Picture" className="w-full h-full rounded-full object-cover" />
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

            <div className="pt-4">
              <h5 className="text-[14px] mb-1 font-semibold">Description/Bio</h5>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md h-[140px] md:w-[700px] w-full p-3 text-[16px] text-[#939393] placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="Add description"
              />

              <p className="text-sm text-[#939393] pb-4">min. 150 characters</p>
            </div>

            <button
              type="submit"
              className={`h-9 w-44 ${isFormValid ? 'bg-[#005580] cursor-pointer' : 'bg-[#CCDDE6] cursor-not-allowed'} text-white text-[12px] rounded-lg mt-9`}
              disabled={!isFormValid}
            >
              Continue
            </button>
          </div>
        )} 
     {currentStep === 2 && (
       <>
      <ProfessionalInfo professionalInfo={professionalInfo} setProfessionalInfo={setProfessionalInfo} />
       
       <div>
         <button
           type="submit"
           className={`h-9 w-44 ${isFormValid ? 'bg-[#005580] cursor-pointer' : 'bg-[#CCDDE6] cursor-not-allowed'} text-white text-[12px] rounded-lg mt-9`}
           disabled={!isFormValid}
         >
           Continue
         </button>
       </div>
     </>
        )}
        {currentStep === 3 && (
          <div className="p-6 md:p-16 w-full md:w-[682px]">
            <div className="w-full mb-4">
              <h1 className="text-xl font-bold">Account Security</h1>
              <p className="text-sm text-[#939393] pb-4">
                Trust and safety is a big deal in our community. Please verify your email and phone number so that we can keep your account secured.
              </p>
              <div className="w-full border"></div>
            </div>

            <div className="h-[40px] w-full md:w-[940px] mt-14 flex flex-col md:flex-row justify-between">
              <div className="flex items-center gap-12 md:gap-10 w-full md:w-auto mb-4 md:mb-0">
                <img src={EmailIcon.src} alt="Email" className="h-8 w-8" />
                <div className="flex flex-row gap-12 md:gap-10">
                  <span className="text-[14px] font-normal text-[#000000]">Email</span>
                  <span className="text-[14px] italic font-normal text-[#555555]">Private</span>
                </div>
              </div>
              <button className="h-[40px] text-[#555555] text-[12px] font-semibold w-full md:w-[120px] bg-[#6FCF97] p-3 rounded-xl">
                Verified
              </button>
            </div>

            <div className="h-[40px] w-full md:w-[940px] mt-14 flex flex-col md:flex-row justify-between">
              <div className="flex items-center gap-12 md:gap-10 w-full md:w-auto mb-4 md:mb-0">
                <img src={PhoneIcon.src} alt="Phone" className="h-8 w-8" />
                <div className="flex flex-row gap-12 md:gap-10">
                  <span className="text-[14px] font-normal text-[#000000]">Phone Number</span>
                  <span className="text-[14px] italic font-normal text-[#555555]">Private</span>
                </div>
              </div>
              {isVerificationComplete ? (
                  <button className="h-[40px] text-[#555555] text-[12px] font-semibold w-full md:w-[120px] bg-[#6FCF97] p-3 rounded-xl">
                    Verified
                  </button>
                ) : (
                  <button
                    className="h-[40px] text-[#555555] text-[12px] font-semibold w-full md:w-[191px] p-3 border rounded-xl"
                    onClick={handleOpenPhoneModal}
                  >
                    Add Phone Number
                  </button>
                )}
              </div>

            <div className="mt-28">
              <button
                type="submit"
                className="h-[40px] text-white bg-[#005382] text-[12px] font-semibold w-full md:w-[170px] p-3 rounded-lg"
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
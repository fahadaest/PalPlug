'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Payment = ({ userId, displayName }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.user.currentStep);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  const handleContinue = (e) => {
    e.preventDefault();
    dispatch({ type: 'NEXT_STEP' }); // Example Redux action to go to the next step
  };

  const handleFinish = (e) => {
    e.preventDefault();
    // Final submission logic here
    console.log('Form submission complete');
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form on every change
  useEffect(() => {
    if (firstName && lastName && description.length >= 150) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [firstName, lastName, description]);

  const firstInitial = firstName.charAt(0) || 'P';
  return (
    <>
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
     
     </>
        )}
        {currentStep === 3 && (
          <></>
        )}
      </form>
       
    </>
  );
};

export default Payment;
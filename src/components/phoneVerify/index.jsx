import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import CloseIcon from '@/assets/images/Closeicon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '@/app/redux/action';
import OTPVerifyModal from './OtpVerifyModal';
import { getAuth, RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth'; // UPDATED: Import PhoneAuthProvider
import ArrowIcon from '@/assets/images/arrow.svg';
import { setVerificationComplete } from '@/app/redux/slice/user/userSlice';

const PhoneVerifyModal = forwardRef(({ isOpen, onClose }, ref) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // NEW STATE: store verificationId for linking phone number later
  const [verificationId, setVerificationId] = useState(null);

  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.countries);

  const setupRecaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      { size: 'invisible', callback: () => {} },
      auth
    );
  };

  useEffect(() => {
    setupRecaptcha();
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    setIsInputFilled(!!phoneNumber && !!selectedCountry);
  }, [phoneNumber, selectedCountry]);

  // UPDATED: Use PhoneAuthProvider.verifyPhoneNumber to get a verificationId instead of signing in
  const handleSendVerificationCode = async () => {
    const auth = getAuth();
    const appVerifier = window.recaptchaVerifier;
    const formattedPhoneNumber = phoneNumber.replace(/\s+/g, '');
    console.log('Formatted Phone Number:', formattedPhoneNumber);
    const phoneRegex = /^\+\d{1,3}\d{7,15}$/;

    if (!appVerifier) {
      console.error('Recaptcha verifier not initialized');
      return;
    }
    if (!formattedPhoneNumber || !phoneRegex.test(formattedPhoneNumber)) {
      console.error('Invalid phone number format');
      console.log('Failed Regex Check:', phoneRegex.test(formattedPhoneNumber));
      return;
    }

    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedPhoneNumber,
        appVerifier
      );
      // Save the verificationId to use in OTP verification (linking)
      setVerificationId(verificationId);
      setIsOtpModalOpen(true);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Optional: You can handle clicks outside if needed
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // When the OTP modal closes, check if verification succeeded and update Redux accordingly.
  const handleOtpClose = (isVerified) => {
    setIsOtpModalOpen(false);
    if (isVerified) {
      dispatch(setVerificationComplete(true)); // Mark verification complete in Redux
      onClose(); // Close the modal after successful verification
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} ModalImg={null}>
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-[#0B0B0B] bg-opacity-10 p-4 sm:p-6 md:p-10 z-20"
        >
          <div
            ref={contentRef}
            className="w-full max-w-[520px] h-[472px] bg-white p-[20px] sm:p-[40px] rounded-[8px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button className="text-gray-500" onClick={onClose}>
                <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            <div className="h-[392px]">
              <div className="w-full max-w-[440px] flex flex-col mb-[16px]">
                <h1 className="text-[18px] sm:text-[20px] md:text-[24px] font-[600]">
                  Verify Phone Number
                </h1>
                <p className="text-[#939393] text-[12px] sm:text-[14px] font-semibold">
                  Thank you for taking a moment to verify your phone number
                </p>
              </div>

              <form className="flex flex-col gap-[32px]">
                <div className="flex flex-col gap-[8px]">
                  <label
                    className="block text-[#2F2F2F] font-[600] text-[12px] sm:text-[14px]"
                    htmlFor="country"
                  >
                    Enter Country
                  </label>
                  {loading ? (
                    <p>Loading countries...</p>
                  ) : (
                    <>
                      <div className="relative w-full">
                        <select
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-3 py-2 border h-[40px] sm:h-[48px] bg-[white] text-[#413f3f] rounded-[8px] appearance-none focus:outline-none"
                        >
                          <option value="" disabled>
                            Select Country
                          </option>
                          {countries.map((country) => (
                            <option
                              className="w-auto sm:w-[440px]"
                              key={country.code}
                              value={country.dialCode}
                            >
                              {country.name} ({country.dialCode})
                            </option>
                          ))}
                        </select>
                        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                          <Image
                            src={ArrowIcon}
                            alt="Arrow Icon"
                            width={16}
                            height={16}
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isDropdownOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-[8px]">
                  <label
                    className="block text-[#2F2F2F] font-[600] text-[12px] sm:text-[14px]"
                    htmlFor="phone"
                  >
                    Enter your Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+ 1 -"
                    className="w-full px-3 py-2 h-[40px] outline-none sm:h-[48px] border border-[#D5D4DC] text-[#2F2F2F] rounded-[8px]"
                  />
                </div>

                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <button
                    type="button"
                    className={`w-full md:w-[210px] h-[40px] md:h-[48px] ${
                      isInputFilled ? 'bg-[#005382]' : 'bg-[#939393]'
                    } text-white text-[12px] md:text-[16px] font-[600] rounded-[8px]`}
                    onClick={handleSendVerificationCode}
                  >
                    Verify by SMS
                  </button>
                  <button
                    className={`w-full md:w-[210px] h-[40px] md:h-[48px] ${
                      isInputFilled ? 'bg-[#005382]' : 'bg-[#939393]'
                    } text-white text-[12px] md:text-[16px] font-[600] rounded-[8px]`}
                  >
                    Verify by Call
                  </button>
                </div>
              </form>
              <div>
                <p className="text-[#939393] text-[12px] sm:text-[14px] font-[400] mt-3 leading-extra-tight">
                  Your phone number will remain private and will not be shared or used for
                  marketing purposes
                </p>
              </div>
              <div id="recaptcha-container"></div>
            </div>
          </div>
        </div>
      </Modal>
      {/* Pass the verificationId to the OTP modal */}
      <OTPVerifyModal
        isOpen={isOtpModalOpen}
        phoneNumber={phoneNumber}
        verificationId={verificationId}
        onClose={handleOtpClose}
      />
    </>
  );
});

export default PhoneVerifyModal;

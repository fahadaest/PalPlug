import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import CloseIcon from '@/assets/images/Closeicon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '@/app/redux/action';
import OTPVerifyModal from './OtpVerifyModal'; 
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import RotatingIcon from '../profileDetails/icon';


const PhoneVerifyModal = forwardRef(({ isOpen, onClose }, ref) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); 
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isInputFilled, setIsInputFilled] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.countries);

  const setupRecaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
      }
    }, getAuth());
  };

  useEffect(() => {
    setupRecaptcha();
    dispatch(fetchCountries()); 
  }, [dispatch]);

  useEffect(() => {
    setIsInputFilled(!!phoneNumber && !!selectedCountry);
  }, [phoneNumber, selectedCountry]);

  const handleSendVerificationCode = () => {
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

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsOtpModalOpen(true);
      })
      .catch((error) => {
        console.error('Error sending verification code:', error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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

  const handleOtpClose = () => {
    setIsOtpModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} ModalImg={null}>
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-[#0B0B0B] bg-opacity-10 p-4 md:p-10 z-20"
        >
          <div
            ref={contentRef}
            className="relative w-[520px] h-[472px] bg-white p-[40px] rounded-[8px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[24px] font-[600]">Verify Phone Number</h2>
              <button className="text-gray-500" onClick={onClose}>
                <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            <p className="text-[#939393] mb-6 text-[14px] font-[400]">
              Thank you for taking a moment to verify your phone number
            </p>

            <form>
            <div className="mb-6 relative">
  <label className="block text-[#2F2F2F] font-[600] text-[14px] mb-2" htmlFor="country">
    Enter Country
  </label>
  {loading ? (
    <p>Loading countries...</p>
  ) : (
    <>
      <select   
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)} 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full px-3 py-2 border h-[48px] bg-[white] text-[#413f3f] rounded-[8px] appearance-none"
      >
        <option value="" disabled>Select Country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.dialCode}>
            {country.name} ({country.dialCode}) 
          </option>
        ))}
      </select>
      <span
        className={`absolute right-3 top-10 transform transition-transform ${
          isDropdownOpen ? 'rotate-180' : 'rotate-0'
        }`}
      >
        <RotatingIcon />
      </span>
    </>
  )}
</div>

                 <div className="mb-6">
                 <label className="block text-[#2F2F2F] font-[600] text-[14px] mb-2" htmlFor="phone">
                  Enter your Phone Number
                 </label>
                 <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+ 1 -"
                  className="w-full px-3 py-2 h-[48px] border border-[#D5D4DC] accent-black text-[#2F2F2F] rounded-[8px]"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`w-[210px] h-[40px] pt-[8px] pb-[11px] pl-[20px] pr-[20px] ${isInputFilled ? 'bg-[#005382]' : 'bg-[#939393]'} text-white text-[16px] font-[600] rounded-[8px]`}
                  onClick={handleSendVerificationCode}
                >
                  Verify by SMS
                </button>
                <button 
                  className={`w-[210px] h-[40px] pt-[8px] pb-[11px] pl-[20px] pr-[20px] ${isInputFilled ? 'bg-[#005382]' : 'bg-[#939393]'} text-white text-[16px] font-[600] rounded-[8px]`}
                >
                  Verify by Call
                </button>
              </div>
            </form>

            <p className="text-[#939393] text-[14px] font-[400] mt-3 leading-extra-tight">
              Your phone number will remain private and will not be shared or used for marketing purposes
            </p>
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </Modal>

      <OTPVerifyModal
        isOpen={isOtpModalOpen}
        phoneNumber={phoneNumber}
        onClose={handleOtpClose}
      />
    </>
  );
});

export default PhoneVerifyModal;



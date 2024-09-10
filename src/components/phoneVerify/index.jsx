import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import CloseIcon from '@/assets/images/Closeicon.svg';
import PhoneInput from 'react-phone-number-input';
import OTPVerifyModal from './OtpVerifyModal'; 
import 'react-phone-number-input/style.css'; 
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';



const PhoneVerifyModal = forwardRef(({ isOpen, onClose }, ref) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); 

  const setupRecaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
               }
    }, getAuth());

};

  useEffect(() => {
    setupRecaptcha();
  }, []);
  const handleSendVerificationCode = () => {
    const auth = getAuth();
    const appVerifier = window.recaptchaVerifier;

    const formattedPhoneNumber = phoneNumber ? phoneNumber.replace(/\s+/g, '') : '';
  
    if (!appVerifier) {
      console.error('Recaptcha verifier not initialized');
      return;
    }
  
    if (!formattedPhoneNumber || !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(formattedPhoneNumber)) {
      console.error('Invalid phone number format');
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
          className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10 p-4 md:p-10 z-20"
        >
          <div
            ref={contentRef}
            className="relative max-w-md w-full bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Verify Phone Number</h2>
              <button className="text-gray-500" onClick={onClose}>
                <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Thank you for taking a moment to verify your phone number
            </p>

            <form>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Enter your Phone Number
                </label>
                <PhoneInput
                  international
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  defaultCountry="US" 
                  className="w-full px-3 py-2 border rounded-lg text-gray-700"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg"
                  onClick={handleSendVerificationCode} 
                >
                  Verify by SMS
                </button>
                <button className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg">
                  Verify by Call
                </button>
              </div>
            </form>

            <p className="text-gray-500 text-sm mt-6">
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

import React, { useState, useRef } from 'react';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import CloseIcon from '@/assets/images/Closeicon.svg'; 
import VerificationComplete from './VerificationComplete';

const OTPVerifyModal = ({ isOpen, phoneNumber, onClose }) => {
  const [isVerificationCompleteOpen, setVerificationCompleteOpen] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill('')); 
  const inputRefs = useRef([]);

  if (!isOpen) return null;

  const handleVerificationCompleteClose = () => {
    setVerificationCompleteOpen(false);
    onClose(); 
  };

  const handleSubmit = () => {
    const confirmationResult = window.confirmationResult;
    const otpCode = otp.join(''); 
    confirmationResult
      .confirm(otpCode)
      .then((result) => {
        console.log('Phone number verified');
        setVerificationCompleteOpen(true);
      })
      .catch((error) => {
        console.error('Error verifying phone number:', error);
      });
  };

  const handleOtpChange = (value, index) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus(); 
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); 
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} ModalImg={null}>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10 p-4 md:p-10 z-20">
          <div className="w-full max-w-[95%] sm:max-w-[400px] md:max-w-[520px] h-auto bg-white p-6 md:p-10 gap-6 rounded-lg shadow-lg relative">
            <div className="flex justify-end items-center pb-2">
              <button className="text-gray-500" onClick={onClose}>
                <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Verify Phone Number</h2>
              <p className="text-gray-500 text-sm sm:text-base">A verification code has been sent to:</p>
              <div className="h-px w-full bg-gray-200"></div>
            </div>

            <div className="flex justify-center items-center mb-6">
              <div className="flex justify-between items-center w-[156px]">
                <span className="text-sm sm:text-base">{phoneNumber}</span>
                <a href="#" className="text-blue-600 text-sm sm:text-base font-semibold" onClick={onClose}>
                  Edit
                </a>
              </div>
            </div>

            {/* Code Input Fields */}
            <div className="flex flex-col items-center gap-6">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center">Please enter the verification code</p>
              <div className="flex justify-center gap-2 sm:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-lg sm:text-xl md:text-2xl font-bold border border-gray-300 rounded-md text-center"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center mt-6">
              <button
                className={`w-full md:w-[210px] h-10 md:h-12 text-white text-sm md:text-base font-semibold rounded-md 
                ${isOtpComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'}`} 
                onClick={handleSubmit}
                disabled={!isOtpComplete} 
              >
                Submit Code
              </button>
            </div>

            <p className="text-gray-500 text-sm sm:text-base text-center mt-4">
              If you did not receive the code, please close this dialog box and check that you entered the right number, then try again.
            </p>
          </div>
        </div>
      </Modal>
      <VerificationComplete
        isOpen={isVerificationCompleteOpen}
        onClose={handleVerificationCompleteClose}
      />
    </>
  );
};

export default OTPVerifyModal;

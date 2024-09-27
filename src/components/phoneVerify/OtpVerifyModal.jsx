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
          <div className="w-full max-w-[95%] h-[470px] sm:max-w-[400px] md:max-w-[520px] bg-white p-[40px] gap-[19px] rounded-lg shadow-lg relative">
            <div className="flex justify-end items-center pb-1">
              <button className="text-gray-500" onClick={onClose}>
                <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
              </button>
            </div>

            <div className="flex flex-col gap-[16px] mb-1">
              <h2 className="text-[20px] sm:text-[24px] font-[600]">Verify Phone Number</h2>
              <p className="text-[#939393] text-[14px] font-[400]">A verification code has been sent to:</p>
              <div className="h-[1px] w-full bg-[#F0F0F0]"></div>
            </div>

            <div className="flex justify-center items-center mb-4">
              <div className="w-[156px] flex justify-between items-center">
                <span className="text-[14px] font-[400]">{phoneNumber}</span>
                <a href="#" className="text-[#005382] text-[14px] font-[600]" onClick={onClose}>
                  Edit
                </a>
              </div>
            </div>

            {/* Code Input Fields */}
            <div className="flex flex-col items-center gap-[19px]">
              <p className="text-[20px] sm:text-[24px] font-[600]">Please enter the verification code</p>
              <div className="flex justify-center gap-[8px] sm:gap-[19px]">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="w-[40px] h-[53px] accent-black text-[24px] font-bold sm:w-[47px] border border-gray-300 rounded-[4px] text-center"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center mt-4">
              <button
                className={`w-full md:w-[210px] h-[40px] text-white text-[14px] font-[600] py-2 rounded-[4px] 
                ${isOtpComplete ? 'bg-[#005382] hover:bg-[#00436b]' : 'bg-[#939393]'}`} 
                onClick={handleSubmit}
                disabled={!isOtpComplete} 
              >
                Submit Code
              </button>
            </div>

            <p className="text-[#939393] text-[14px] font-[400] text-center mt-2">
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


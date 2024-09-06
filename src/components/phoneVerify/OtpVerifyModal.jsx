import React, { useState } from 'react';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import CloseIcon from '@/assets/images/Closeicon.svg'; 
import VerificationComplete from './VerificationComplete';
const OTPVerifyModal = ({ isOpen, phoneNumber, onClose }) => {
  const [isVerificationCompleteOpen, setVerificationCompleteOpen] = useState(false);
  if (!isOpen) return null;
  const handleVerificationCompleteClose = () => {
    setVerificationCompleteOpen(false);
    onClose(); 
  };
  const handleSubmit = () => {
    setVerificationCompleteOpen(true);
  };
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} ModalImg={null}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10 p-4 md:p-10 z-20">
        <div className="relative max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Verify Phone Number</h2>
            <button className="text-gray-500" onClick={onClose}>
              <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">A verification code has been sent to:</p>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold">{phoneNumber}</span>
            <a 
              href="#"
              className="text-blue-500 font-semibold"
              onClick={onClose}
            >
              Edit
            </a>
          </div>
          <p className="text-lg font-semibold mb-4">Please enter the verification code</p>
          <div className="flex justify-between mb-6">
            <input
              type="text"
              className="w-12 h-12 border border-gray-300 rounded text-center text-lg"
              maxLength="1"
            />
            <input
              type="text"
              className="w-12 h-12 border border-gray-300 rounded text-center text-lg"
              maxLength="1"
            />
            <input
              type="text"
              className="w-12 h-12 border border-gray-300 rounded text-center text-lg"
              maxLength="1"
            />
            <input
              type="text"
              className="w-12 h-12 border border-gray-300 rounded text-center text-lg"
              maxLength="1"
            />
          </div>
          <button className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold" onClick={(handleSubmit)}>
            Submit Code
          </button>
          <p className="text-gray-500 text-sm mt-4 text-center">
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

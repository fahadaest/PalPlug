import React from 'react';
import { Modal } from '@/components/Modal'; 
import CloseIcon from '@/assets/images/Closeicon.svg';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setVerificationComplete } from '@/app/redux/slice/user/userSlice';
const VerificationComplete = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="relative max-w-md w-full bg-white rounded-xl p-6 mx-4 sm:mx-6 lg:mx-8">
                <div className="absolute top-4 right-4">
                    <div
                        className="p-1 rounded-full hover:bg-[#005382] cursor-pointer"
                        onClick={onClose}
                    >
                        <Image
                            src={CloseIcon}
                            alt="close"
                            className="w-6 h-6"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-xl font-semibold leading-tight mb-2">Verification Complete!</h1>
                    <p className="text-sm text-[#939393] mb-6">Your phone number was verified successfully. Thank you!</p>
                </div>
                <div className="flex justify-center">
                    <button className="h-10 rounded-md text-white text-sm font-semibold w-full max-w-xs bg-[#005382]"
                    onClick={() => {
                        dispatch(setVerificationComplete(true));
                        onClose();
                      }}
                    >
                        Okay
                    </button>
                </div>
            </div>
        </div>
      
    </Modal>
  );
};

export default VerificationComplete;
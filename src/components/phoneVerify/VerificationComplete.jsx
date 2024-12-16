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
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 p-4 sm:p-6 lg:p-8">
                <div className="relative w-full max-w-md bg-white rounded-xl p-6 sm:p-8">
                    {/* Close Button */}
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

                    {/* Content Section */}
                    <div className="text-center">
                        <h1 className="text-lg sm:text-xl font-semibold leading-tight mb-2">
                            Verification Complete!
                        </h1>
                        <p className="text-sm sm:text-base text-[#939393] mb-6">
                            Your phone number was verified successfully. Thank you!
                        </p>
                    </div>

                    {/* Button Section */}
                    <div className="flex justify-center">
                        <button
                            className="h-10 w-full max-w-xs rounded-md bg-[#005382] text-white text-sm sm:text-base font-semibold hover:bg-[#00436b]"
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

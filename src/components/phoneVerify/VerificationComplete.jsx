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
                <div className="h-[206px] bg-white relative flex flex-col gap-[8px] w-full max-w-[520px] rounded-[8px] p-[30px]">
                    <div className="flex justify-end">
                        <button className="text-gray-500" onClick={onClose}>
                            <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
                        </button>
                    </div>
                    <div className='h-[126px] w-[440px] flex flex-col gap-[60px]'>
                        <div className="h-[24px] flex flex-col gap-[8px]">
                            <h1 className="text-2xl sm:text-xl font-semibold">Verification Complete!</h1>
                            <p className="text-[12px] font-lightbold leading-[14px] text-[#939393]">  Your phone number was verified successfully. Thank you!</p>
                        </div>

                        <div className="flex justify-center">
                            <button
                                className="w-full bg-[#005382] md:w-[210px] h-[40px] text-white text-[12px] pl-[20px] pr-[20px] pt-[11px] pb-[11px] font-semibold rounded-[8px]"
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
            </div>
        </Modal>
    );
};

export default VerificationComplete;

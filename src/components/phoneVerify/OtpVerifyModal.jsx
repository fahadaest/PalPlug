import React, { useState, useRef } from 'react';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import CloseIcon from '@/assets/images/Closeicon.svg';
import VerificationComplete from './VerificationComplete';
import { getAuth, PhoneAuthProvider, linkWithCredential } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/redux/slice/user/userSlice'; // optional: update Redux state

const OTPVerifyModal = ({ isOpen, phoneNumber, verificationId, onClose }) => {
  const [isVerificationCompleteOpen, setVerificationCompleteOpen] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();

  // Move the handler above its usage:
  const handleVerificationCompleteClose = () => {
    setVerificationCompleteOpen(false);
    onClose(true);
  };

  if (!isOpen) return null;

  // If linking is already complete, immediately show the VerificationComplete modal.
  if (isVerificationCompleteOpen) {
    return (
      <VerificationComplete isOpen={true} onClose={handleVerificationCompleteClose} />
    );
  }

  const handleSubmit = async () => {
    const auth = getAuth();
    const otpCode = otp.join('');
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otpCode);
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Check if a phone provider is already linked
        const phoneAlreadyLinked = currentUser.providerData.some(
          (provider) => provider.providerId === 'phone'
        );
        if (phoneAlreadyLinked) {
          console.log("Phone number is already linked; skipping linking.");
          setVerificationCompleteOpen(true);
          return;
        }
        await linkWithCredential(currentUser, credential);
        console.log('Phone number linked successfully');
        // Optional: Update Redux state with the updated user info.
        dispatch(setUser(currentUser));
        setVerificationCompleteOpen(true);
      } else {
        console.error('No current user found to link phone number');
      }
    } catch (error) {
      if (error.code === 'auth/provider-already-linked') {
        console.log("Phone number already linked; treating as success.");
        setVerificationCompleteOpen(true);
      } else {
        console.error('Error linking phone number:', error);
      }
    }
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
    <Modal isOpen={isOpen} onClose={onClose} ModalImg={null}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10 z-20">
        <div className="w-full max-w-[95%] sm:max-w-[400px] md:max-w-[520px] p-[40px] h-auto md:h-[404px] bg-white gap-6 rounded-lg shadow-lg relative">
          <div className="flex justify-end items-center">
            <button className="text-gray-500" onClick={onClose}>
              <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
          <div className="h-auto md:h-[327px] w-full max-w-[440px] flex flex-col gap-[19px]">
            <div className="flex flex-col gap-[16px] w-[440px] h-[70px]">
              <div className="flex flex-col">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Verify Phone Number</h2>
                <p className="text-gray-500 font-lightbold text-sm sm:text-base">
                  A verification code has been sent to:
                </p>
              </div>
              <div className="w-[290px] md:w-[440px] border border-[#F0F0F0]"></div>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex justify-between items-center gap-[19px] w-[156px]">
                <span className="text-sm sm:text-base">{phoneNumber}</span>
                <button
                  className="text-[#005382] text-sm sm:text-base font-semibold bg-transparent border-none cursor-pointer"
                  onClick={onClose}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
                Please enter the verification code
              </p>
              <div className="flex justify-center gap-2 sm:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    className="w-[37px] h-[53px] sm:w-[47px] sm:h-[53px] md:w-[47px] md:h-[53px] text-lg sm:text-xl md:text-2xl font-bold border border-gray-300 rounded-md text-center"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center flex-col">
              <button
                className={`w-full md:w-[210px] h-[40px] text-white text-[12px] pl-[20px] pr-[20px] pt-[11px] pb-[11px] font-semibold rounded-[8px] ${
                  isOtpComplete ? 'bg-[#005382]' : 'bg-gray-400'
                }`}
                onClick={handleSubmit}
                disabled={!isOtpComplete}
              >
                Submit Code
              </button>
            </div>
            <div>
              <p className="text-[#939393] text-center font-lightbold text-[14px] leading-[14px]">
                If you did not receive the code, please close this dialog box and check that you
                entered the right number, then try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OTPVerifyModal;

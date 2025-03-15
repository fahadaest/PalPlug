import React from 'react';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import CloseIcon from '@/assets/images/Closeicon.svg';

const AlreadyVerifiedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <div className="flex justify-end">
            <button onClick={onClose}>
              <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">Already Verified</h2>
          <p className="mb-4">
            You cannot verify your phone number. Your phone number is already verified.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlreadyVerifiedModal;

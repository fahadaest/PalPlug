import React, { useRef } from 'react';
import ModalImg from '@/assets/images/Modal.svg';
import {
    GithubButton,
    GoogleButton,
    LinkedInButton,
} from './SocialMediaButtons';
import CloseIcon from '@/assets/images/Closeicon.svg';
import Image from 'next/image';
import { Modal } from '../Modal';

const SignInModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(Modal);

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} ModalImg={ModalImg}>      
        <div
            className="fixed    inset-0 flex items-center justify-center bg-black bg-opacity-75 p-4 md:p-10 z-20"
            onClick={onClose} 
        >
            <div
                ref={modalRef}
                className="relative max-w-xl w-full max-h-full overflow-y-hidden rounded-xl bg-white sm:rounded-2xl scrollbar-hide"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="absolute top-4 right-4 overflow">
                    <div
                        className="p-0.5 rounded-full hover:bg-[#005382] cursor-pointer"
                        onClick={onClose}
                    >
                        <Image
                            src={CloseIcon}
                            alt="close"
                            className="w-6 h-6 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="w-full bg-[#D2EFFF] px-10 py-12">
                    <Image
                        src={ModalImg}
                        className="w-full h-auto object-cover object-center"
                        alt="modal-image"
                        priority
                    />
                </div>

                <div className="md:min-w-[400px] h-full flex flex-col gap-4 px-10 py-7">
                    <GoogleButton />
                    <LinkedInButton />
                    <GithubButton />
                </div>
            </div>
        </div>
        </Modal>
    );
};

export default SignInModal;
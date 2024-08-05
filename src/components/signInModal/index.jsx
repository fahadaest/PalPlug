import React from 'react';
import ModalImg from '@/assets/images/Modal.svg';
import {
    GithubButton,
    GoogleButton,
    LinkedInButton,
} from './SocialMediaButtons';
import { Modal } from '@/components/Modal';

const SignInModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} ModalImg={ModalImg}>
            <div className="flex justify-center pt-9 pb-7">
                <div className="flex flex-col gap-4 w-full px-10">
                    <GoogleButton />
                    <LinkedInButton />
                    <GithubButton />
                </div>
            </div>
        </Modal>
    );
};

export default SignInModal;

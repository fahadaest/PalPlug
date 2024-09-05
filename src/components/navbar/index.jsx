import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import BellIcon from '@/assets/images/bell.svg';
import MailIcon from '@/assets/images/mail.svg';
import UserImg from '@/assets/images/user.svg';
import ArrowIcon from '@/assets/images/arrow.svg';
import mobileLogo from '@/assets/images/mblLogo.svg';
import { useRouter, usePathname } from 'next/navigation'; 
import { useSelector } from 'react-redux';
import SignInModal from '@/components/signInModal/index';
import StepProgressBar from './StepProgressBar';

const NavbarDropdown = dynamic(() => import('../navbarDropdown'), {
    ssr: false,
});

const Navbar = () => {
    const user = useSelector((state) => state.user.user);
    const currentStep = useSelector((state) => state.user.currentStep); 
  
    const router = useRouter();
    const pathname = usePathname(); 

    const [hasLoggedIn, setHasLoggedIn] = useState(false);  
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (user && !hasLoggedIn) {
            setHasLoggedIn(true);  
            setModalOpen(false);
        }
    }, [user, hasLoggedIn]);

    const handleClick = (e) => {
        if (e?.target?.tagName === 'IMG') {
            e.stopPropagation();
            router.push('/');
        }
    };

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    const dropdownRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }

            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLoginClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const isProfilePage = pathname?.includes('/profile'); 

    return (
        <nav className="bg-white shadow-md p-4 sm:p-5 flex flex-row justify-between items-center sticky z-10 w-full top-0 left-0 min-h-[64px] sm:min-h-[80px]">
            <div className="flex items-center space-x-4 flex-grow">
                <div
                    className="relative w-10 h-6 sm:w-24 sm:h-8 cursor-pointer"
                    onClick={handleClick}
                >
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="hidden md:block object-contain"
                        fill
                        priority
                    />
                    <Image
                        src={mobileLogo}
                        alt="Mobile Logo"
                        className="block md:hidden object-contain"
                        fill
                        priority
                    />
                </div>
                {isProfilePage && (
                    <div className="flex items-center justify-end w-full max-w-xl ml-auto h-full">
                        <StepProgressBar currentStep={currentStep} className="w-full h-full" />
                    </div>
                )}
                {!isProfilePage && (
                    <input
                        type="text"
                        placeholder="Search by company"
                        className="p-2 rounded-lg border border-default focus:border-focus focus:outline-border-focus w-full max-w-[190px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[452px] mx-2"
                    />
                )}
            </div>

            {!isProfilePage && (
                <div className="flex items-center space-x-3 sm:space-x-2 flex-shrink-0">
                    {user ? (
                        <>
                            <Image
                                src={BellIcon}
                                alt="Bell Icon"
                                className="text-black text-xl cursor-pointer"
                            />
                            <Image
                                src={MailIcon}
                                alt="Mail Icon"
                                className="text-black text-xl cursor-pointer"
                            />
                            <div className="relative flex items-center space-x-2">
                                <Image
                                    src={UserImg}
                                    alt="User Image"
                                    className="text-black text-xl cursor-pointer"
                                />
                                <div className="hidden md:flex items-center space-x-3">
                                    <span className="text-heading font-semibold truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px] text-xs sm:text-sm md:text-base">
                                        {user.displayName}
                                    </span>
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={toggleDropdown}
                                            className={`bg-blue-100 hover:bg-blue-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-full p-2.5 inline-flex items-center justify-center transition-colors duration-300 ${isDropdownOpen ? 'bg-blue-200' : 'bg-blue-100'} ${isDropdownOpen ? 'active:bg-blue-300' : ''} hidden md:block`}
                                            type="button"
                                        >
                                            <span className="sr-only">
                                                Open dropdown
                                            </span>
                                            <Image
                                                src={ArrowIcon}
                                                alt="Arrow Icon"
                                                width={16}
                                                height={16}
                                                className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                                            />
                                        </button>

                                        {isDropdownOpen && (
                                            <NavbarDropdown
                                                isOpen={isDropdownOpen}
                                                userId={user.id || user.uid}  
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="bg-[#005382] text-white px-4 py-2 rounded"
                        >
                            Log in
                        </button>
                    )}
                </div>
            )}

            <SignInModal isOpen={isModalOpen} onClose={handleModalClose} ref={modalRef} />
        </nav>
    );
};

export default Navbar;

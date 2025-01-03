import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import BellIcon from '@/assets/images/bell.svg';
import MailIcon from '@/assets/images/mail.svg';
import UserImg from '@/assets/images/user.svg';
import ArrowIcon from '@/assets/images/navarrow.svg';
import mobileLogo from '@/assets/images/mblLogo.svg';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import SignInModal from '@/components/signInModal/index';
import StepProgressBar from './StepProgressBar';
import Search from '@/assets/images/search-loupe.svg';
import ServicesProgressBar from './ServicesProgressBar';
import { setCurrentStep, setServicesCurrentStep } from '@/app/redux/slice/user/userSlice';


const NavbarDropdown = dynamic(() => import('../navbarDropdown'), {
    ssr: false,
});

const Navbar = () => {
    const user = useSelector((state) => state.user.user);
    const currentStep = useSelector((state) => state.user.currentStep);
    const currentStepservices = useSelector((state) => state.user.servicescurrentStep);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const dropdownRef = useRef(null);
    const modalRef = useRef(null);

    const handleStepClick = (step) => {
        dispatch(setServicesCurrentStep(step));
    };
    useEffect(() => {
        if (user && !hasLoggedIn) {
            setHasLoggedIn(true);
            setModalOpen(false);
        }
    }, [user, hasLoggedIn]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = (e) => {
        if (e?.target?.tagName === 'IMG') {
            e.stopPropagation();
            router.push('/');
        }
        dispatch(setCurrentStep(1));
        dispatch(setServicesCurrentStep(1));
    };

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);

    };

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

    const handlePlugDasboard = () => {
        router.push('/profileDashboard');
    };

    const isProfilePage = pathname?.includes('/profile');
    const isServicesSelectionPage = pathname?.includes('/servicesselection');

    const inlineStyle = isProfilePage ? { boxShadow: '0px 8px 20px 0px #B8B4B41A' } : {};

    return (
        <div className='flex flex-col'>
            <nav className="bg-white p-4 sm:p-5 flex flex-row justify-between items-center sticky z-10 w-full top-0 left-0 min-h-[64px] sm:min-h-[80px]" style={inlineStyle}>
                <div className="flex items-center md:space-x-12 flex-grow xs:w-[390px] ">
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
                            className="block md:hidden  pr-0 mr-0 object-contain"
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
                        <div className="w-full border rounded-[8px] md:rounded-[4px] h-[40px] flex items-center max-w-[452px] min-w-[211px]">
                            <div className='flex flex-row h-[16px] items-center gap-[4px] w-[158px] pl-[10px]'>
                                <div className="h-[16px] w-[16px]">
                                    <img
                                        src={Search.src}
                                        alt="Search"
                                        className="h-[16px] w-[16px] max-w-none max-h-none"
                                    />
                                </div>

                                <div className="h-[16px] w-[138px]  flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search by company"
                                        className="  h-[14px] w-[138px] tracking-tight placeholder-[#555555]  text-[14px] font-[400] leading-[14px]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {!isProfilePage && (
                    <div className="h-[36px] min-w-[116px] md:w-[248px] gap-[8px] md:gap-[24px] flex items-center">
                        {user ? (
                            <>
                                <div className='flex w-[64px] gap-[5px] md:gap-[16px]'>

                                    <Image
                                        src={BellIcon}
                                        alt="Bell Icon"
                                        className="text-black h-[24px] w-[24px] cursor-pointer"
                                    />
                                    <Image
                                        src={MailIcon}
                                        alt="Mail Icon"
                                        className="text-black h-[24px] w-[24px] cursor-pointer"
                                    />
                                </div>
                                <div className="md:w-full flex items-center gap-[8px]">
                                    <Image
                                        onClick={handlePlugDasboard}
                                        src={UserImg}
                                        alt="User Image"
                                        className="h-[36px] w-[36px] text-black text-lg cursor-pointer"
                                    />
                                    <div className="w-full max-w-fit flex flex-nowrap items-center">
                                        <div
                                            className="text-heading hidden md:block h-[16px] w-full font-[600] text-[14px]"
                                        >
                                            {user.displayName && user.displayName.length > 20
                                                ? `${user.displayName.substring(0, 20)}...`
                                                : user.displayName || "Unknown User"}
                                        </div>

                                        <div className="relative flex" ref={dropdownRef}>
                                             <button
                                                onClick={toggleDropdown}
                                                className={`bg-blue-100 hover:bg-blue-200 focus:ring-2 ml-0 md:ml-2 focus:outline-none  focus:ring-blue-300 font-medium rounded-full  w-[16px] h-[16px]  inline-flex items-center justify-center transition-colors duration-300 ${isDropdownOpen ? 'bg-blue-200' : 'bg-blue-100'} ${isDropdownOpen ? 'active:bg-blue-300' : 'block'}`}
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
                                                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10">
                                                    <NavbarDropdown
                                                        isOpen={isDropdownOpen}
                                                        userId={user.id || user.uid}
                                                        setDropdownOpen={setDropdownOpen}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="bg-[#005382] flex justify-center text-[14px] font-[600] items-center h-[34px] text-primary p-[10px] rounded-[8px] ml-auto"
                            >
                                Log in
                            </button>
                        )}
                    </div>
                )}
            </nav>
            {isServicesSelectionPage && (

                <ServicesProgressBar currentStepservices={currentStepservices} onStepClick={handleStepClick} />

            )}
            <SignInModal isOpen={isModalOpen && !user} onClose={handleModalClose} ref={modalRef} />
        </div>
    );
};

export default Navbar;


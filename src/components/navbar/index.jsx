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
import { useDispatch, useSelector } from 'react-redux';
import SignInModal from '@/components/signInModal/index';
import StepProgressBar from './StepProgressBar';
import Search from '@/assets/images/Search.svg';
import ServicesProgressBar from './ServicesProgressBar';
import { setServicesCurrentStep } from '@/app/redux/slice/user/userSlice';

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
    const [isMobile, setIsMobile] = useState(false); // Detect mobile view

    const dropdownRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (user && !hasLoggedIn) {
            setHasLoggedIn(true);  
            setModalOpen(false);
        }
    }, [user, hasLoggedIn]);

    useEffect(() => {
        // Check for mobile view
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Mobile view is less than 768px (md breakpoint)
        };

        // Set initial mobile view state
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
    };

    const toggleDropdown = () => {
        // Only toggle the dropdown in mobile view
        if (isMobile) {
            setDropdownOpen(prevState => {
                const newState = !prevState;
                console.log(newState ? 'Dropdown opened' : 'Dropdown closed'); // Log state
                return newState;
            });
        }
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

  

    const isProfilePage = pathname?.includes('/profile'); 
    const isServicesSelectionPage = pathname?.includes('/servicesselection');

    return (
        <div className='flex flex-col'>
            <nav className="bg-white p-4 sm:p-5 flex flex-row justify-between items-center sticky z-10 w-full top-0 left-0 min-h-[64px] sm:min-h-[80px]">
                <div className="flex  items-center md:space-x-12 flex-grow xs:w-[390px] ">
                    <div
                        className=" relative w-10 h-6 sm:w-24 sm:h-8 cursor-pointer"
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
                        <div className=" flex items-center justify-end w-full max-w-xl ml-auto h-full">
                            <StepProgressBar currentStep={currentStep} className="w-full h-full" />
                        </div>
                    )}
                    {!isProfilePage &&  (
                        <div className="relative  max-w-[452px] mx-2">
                            <Image
                                src={Search}
                                alt="Search Icon"
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-4 xs:w-3 xs:h-3 sm:w-3 sm:h-4 lg:w-[16px] lg:h-[16px]"
                                />
                            <input
                                type="text"
                                placeholder="Search by company"
                                className="pl-[22px] p-2 rounded-[4px] placeholder-[#555555] border border-[#F0F0F0] text-[10px] lg:text-lg lg:pl-9 focus:border-blue-500 focus:outline-none w-full max-w-full "

                                />
                        </div>
                    )}
                </div>

                {!isProfilePage &&  (
                    <div className="h-[36px]   xs:w-[116px]  xs:gap-[16px]  md:w-[252px] md:gap-[8px]  flex items-center  flex-shrink-0 ">
                        {user ? (
                            <>
                                <div className=' flex w-[72px]  xs:gap-4'>

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
                                    </div>
                                <div className="relative flex items-center  space-x-1">
                                    {/* User Image visible on both mobile and desktop */}
                                    <Image
                                        src={UserImg}
                                        alt="User Image"
                                        className= "h-[36px] w-[36px] text-black text-lg cursor-pointer" 
                                        onClick={toggleDropdown} 
                                        log
                                    />
                                    {isMobile && isDropdownOpen && (
                                        <div className="absolute right-0 mt-2  w-48  border border-gray-200 rounded-lg shadow-lg z-10" ref={dropdownRef}>
                                            <NavbarDropdown
                                                isOpen={isDropdownOpen}
                                                userId={user.id || user.uid}
                                            />
                                        </div>
                                    )}

                                    {/* Dropdown trigger for desktop view */}
                                    <div className="hidden  md:flex items-center">
                                        <span className="text-heading font-semibold truncate max-w-[100px] sm:max-w-[120px] md:max-w-[100px] text-xs sm:text-sm md:text-base">
                                            {user.displayName}
                                        </span>
                                        <div className="relative " ref={dropdownRef}>
                                            <button
                                                onClick={() => setDropdownOpen(!isDropdownOpen)} // Desktop dropdown trigger
                                                className={`bg-blue-100 hover:bg-blue-200 focus:ring-2  focus:outline-none  focus:ring-blue-300 font-medium rounded-full  ml-2 w-[16px] h-[16px]  inline-flex items-center justify-center transition-colors duration-300 ${isDropdownOpen ? 'bg-blue-200' : 'bg-blue-100'} ${isDropdownOpen ? 'active:bg-blue-300' : ''} hidden md:block`}
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
                                                    className={`w-4 h-4  transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
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
                                className="bg-[#005382] text-white px-4 py-2 rounded ml-auto"
                                >
                                Log in
                            </button>
                        )}
                    </div>
                )}
                  
            </nav>
            {isServicesSelectionPage && (
              
              <ServicesProgressBar currentStepservices={currentStepservices} />
       
      )}
          

            <SignInModal isOpen={isModalOpen} onClose={handleModalClose} ref={modalRef} />
        </div>
    );
};

export default Navbar;




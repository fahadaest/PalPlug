'use client';
import React, { lazy, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import BellIcon from '@/assets/images/bell.svg';
import MailIcon from '@/assets/images/mail.svg';
import UserImg from '@/assets/images/user.svg';
import ArrowIcon from '@/assets/images/arrow.svg';
import mobileLogo from '@/assets/images/mblLogo.svg';

const NavbarDropdown = dynamic(() => import('../navbarDropdown'), {
    ssr: false,
});

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-md p-4 sm:p-5 flex flex-row justify-between items-center sticky z-10 w-full top-0 left-0">
            <div className="flex items-center  md:space-x-4 flex-grow">
                <div className="relative w-10 h-6 sm:w-24 sm:h-8">
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

                <input
                    type="text"
                    placeholder="Search by company"
                    className="p-2 rounded-lg border border-default focus:border-focus focus:outline-border-focus w-full max-w-[190px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-[452px] mx-2   sm:mx-0"
                />
            </div>

            <div className="flex items-center space-x-3 sm:space-x-2 flex-shrink-0">
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
                            Idris Gettani
                        </span>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className={`bg-blue-100 hover:bg-blue-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-full p-2.5 inline-flex items-center justify-center transition-colors duration-300  ${isDropdownOpen ? 'bg-blue-200' : 'bg-blue-100'} ${isDropdownOpen ? 'active:bg-blue-300' : ''} hidden md:block`}
                                type="button"
                            >
                                <span className="sr-only">Open dropdown</span>
                                <Image
                                    src={ArrowIcon}
                                    alt="Arrow Icon"
                                    width={16}
                                    height={16}
                                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                                />
                            </button>

                            {isDropdownOpen && (
                                <NavbarDropdown isOpen={isDropdownOpen} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

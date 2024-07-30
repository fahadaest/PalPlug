"use client"
import React from 'react';
import UserImg from '@/assets/images/user.svg';
import Image from 'next/image';

const NavbarDropdown = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="z-10 bg-white rounded-lg shadow w-72 dark:bg-gray-700 absolute right-0 mt-2">
            <div className="flex items-center text-sm text-gray-900 dark:text-white p-4 space-x-3">
                <Image
                    className="w-8 h-8 rounded-full"
                    src={UserImg}
                    alt="User Photo"
                />
                <div>
                    <div className="truncate text-text-heading font-semibold">
                        Username
                    </div>
                    <div className="font-lightbold truncate text-grey">
                        username@gmail.com
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-4 px-4">
                <a
                    href="#"
                    className="bg-[#005382] text-white text-center rounded-lg py-2 w-full"
                    style={{ borderRadius: '8px' }}
                >
                    Become a plug
                </a>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600"></div>
            <ul className="text-sm text-gray-700 dark:text-gray-200 divide-y divide-gray-100 dark:divide-gray-600">
                <li>
                    <a
                        href="#"
                        className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Profile
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Settings
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Billing and payments
                    </a>
                </li>
            </ul>
            <div className="border-t border-gray-200 dark:border-gray-600"></div>
            <div className="py-2">
                <a
                    href="#"
                    className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                    Logout
                </a>
            </div>
        </div>
    );
};

export default NavbarDropdown;

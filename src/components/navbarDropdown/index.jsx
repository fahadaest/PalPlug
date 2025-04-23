'use client';
import React, { useEffect, useState } from 'react';
import UserImg from '@/assets/images/user.svg';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '@/app/utils/firebase';
import { loginFailure, logout } from '@/app/redux/slice/user/userSlice';
import { useRouter } from 'next/navigation';

const NavbarDropdown = ({ isOpen, userId, setDropdownOpen }) => {
  const dispatch = useDispatch();
  const [isPlug, setIsPlug] = useState(false);
  useEffect(() => {
    setIsPlug(localStorage.getItem('isPlug') === 'true');
  }, []);
  const router = useRouter();
  const userFromStore = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      localStorage.removeItem('profile_id');
      localStorage.removeItem('services');
      router.push('/'); 
      setDropdownOpen(false);
    } catch (error) {
      dispatch(loginFailure(error?.message || "Something went wrong!"));
    }
  };

  const handleBecomeAPlug = () => {
    if (userId) {
      router.push(`/profile/${userId}`);
      setDropdownOpen(false);
    } else {
      console.error('User ID is undefined');
    }
  };

  const handleprofile = () => {
    if (userId) {
      router.push(`/candidate-profile`);
      setDropdownOpen(false);
    } else {
      console.error('No such route');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-10 bg-white rounded-lg shadow w-72 dark:bg-gray-700 absolute right-0 mt-3">
      <div className="flex items-center text-sm text-gray-900 dark:text-white p-4 space-x-3">
        <Image
          className="w-8 h-8 rounded-full"
          src={userFromStore?.photoUrl}
          alt={userFromStore?.displayName || 'User'}
          width={36}
          height={36}
          unoptimized
        />
        <div>
          <div className="truncate text-text-heading font-semibold">
            {userFromStore?.displayName || "Username"}
          </div>
          <div className="font-lightbold truncate text-grey">
            {userFromStore?.email || "username@gmail.com"}
          </div>
        </div>
      </div>
      {!isPlug && (
      <div className="flex justify-center my-4 px-4">
        <button
          onClick={handleBecomeAPlug}
          className="bg-[#005382] text-white text-center rounded-lg py-2 w-full"
          style={{ borderRadius: '8px' }}
        >
          Become a plug
        </button>
      </div>
      )}
      <div className="border-t border-gray-200 dark:border-gray-600"></div>
      <ul className="text-sm text-gray-700 dark:text-gray-200 divide-y divide-gray-100 dark:divide-gray-600">
        <li>
          <a
            onClick={handleprofile}
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
            className="block w-full cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Billing and payments
          </a>
        </li>
      </ul>
      <div className="border-t border-gray-200 dark:border-gray-600"></div>
      <div className="py-2">
        <a
          onClick={handleLogout}
          href="#"
          className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default NavbarDropdown;
